import { UserProfile } from "../types";
import { getGoogleAccessToken } from "./firebase";

export const GOOGLE_SHEET_NAME = "User Deatils on NeuroQuest";

export interface SyncResult {
  success: boolean;
  spreadsheetId?: string;
  spreadsheetUrl?: string;
  isNewSheet?: boolean;
  message?: string;
}

export class GoogleSheetsService {
  private static instance: GoogleSheetsService;
  private cachedSpreadsheetId: string | null = null;
  private cachedSpreadsheetUrl: string | null = null;

  private constructor() {
    try {
      this.cachedSpreadsheetId = localStorage.getItem("neuroquest_gdrive_sheet_id");
      this.cachedSpreadsheetUrl = localStorage.getItem("neuroquest_gdrive_sheet_url");
    } catch {
      // Ignore
    }
  }

  public static getInstance(): GoogleSheetsService {
    if (!GoogleSheetsService.instance) {
      GoogleSheetsService.instance = new GoogleSheetsService();
    }
    return GoogleSheetsService.instance;
  }

  public getCachedSheetUrl(): string | null {
    return this.cachedSpreadsheetUrl;
  }

  public getCachedSheetId(): string | null {
    return this.cachedSpreadsheetId;
  }

  /**
   * Find or create the "User Deatils on NeuroQuest" spreadsheet in Google Drive
   */
  public async getOrCreateSpreadsheet(accessToken: string): Promise<{ id: string; url: string; createdNew: boolean }> {
    // 1. Search if the file already exists on Drive
    try {
      const searchUrl = `https://www.googleapis.com/drive/v3/files?q=name%20%3D%20'${encodeURIComponent(
        GOOGLE_SHEET_NAME
      )}'%20and%20trashed%20%3D%20false&fields=files(id,name,webViewLink)`;
      
      const searchRes = await fetch(searchUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (searchRes.ok) {
        const searchData = await searchRes.json();
        if (searchData.files && searchData.files.length > 0) {
          const file = searchData.files[0];
          const sheetUrl = file.webViewLink || `https://docs.google.com/spreadsheets/d/${file.id}`;
          this.cachedSpreadsheetId = file.id;
          this.cachedSpreadsheetUrl = sheetUrl;
          try {
            localStorage.setItem("neuroquest_gdrive_sheet_id", file.id);
            localStorage.setItem("neuroquest_gdrive_sheet_url", sheetUrl);
          } catch {
            // Ignore
          }
          return { id: file.id, url: sheetUrl, createdNew: false };
        }
      }
    } catch (err) {
      console.warn("Drive search error:", err);
    }

    // 2. Create the spreadsheet if not found
    const createRes = await fetch("https://sheets.googleapis.com/v4/spreadsheets", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties: {
          title: GOOGLE_SHEET_NAME,
        },
        sheets: [
          {
            properties: {
              title: "Registered Users",
              gridProperties: {
                frozenRowCount: 1,
              },
            },
            data: [
              {
                startRow: 0,
                startColumn: 0,
                rowData: [
                  {
                    values: [
                      { userEnteredValue: { stringValue: "Timestamp" } },
                      { userEnteredValue: { stringValue: "User ID" } },
                      { userEnteredValue: { stringValue: "Full Name" } },
                      { userEnteredValue: { stringValue: "Username" } },
                      { userEnteredValue: { stringValue: "Email" } },
                      { userEnteredValue: { stringValue: "Age" } },
                      { userEnteredValue: { stringValue: "Auth Provider" } },
                      { userEnteredValue: { stringValue: "Joined Date" } },
                      { userEnteredValue: { stringValue: "Level" } },
                      { userEnteredValue: { stringValue: "XP" } },
                      { userEnteredValue: { stringValue: "Sparks" } },
                      { userEnteredValue: { stringValue: "Streak Days" } },
                      { userEnteredValue: { stringValue: "Status" } },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      }),
    });

    if (!createRes.ok) {
      const errText = await createRes.text();
      throw new Error(`Failed to create Google Sheet: ${errText}`);
    }

    const newSheet = await createRes.json();
    const sheetId = newSheet.spreadsheetId;
    const sheetUrl = newSheet.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${sheetId}`;

    this.cachedSpreadsheetId = sheetId;
    this.cachedSpreadsheetUrl = sheetUrl;
    try {
      localStorage.setItem("neuroquest_gdrive_sheet_id", sheetId);
      localStorage.setItem("neuroquest_gdrive_sheet_url", sheetUrl);
    } catch {
      // Ignore
    }

    return { id: sheetId, url: sheetUrl, createdNew: true };
  }

  /**
   * Append a registered/logged in user row to the Google Sheet
   */
  public async syncUserToGoogleSheet(
    profile: UserProfile,
    explicitToken?: string | null
  ): Promise<SyncResult> {
    const accessToken = explicitToken || getGoogleAccessToken();
    if (!accessToken) {
      return {
        success: false,
        message: "Google Workspace OAuth token not available for Drive/Sheets sync.",
      };
    }

    try {
      const { id: spreadsheetId, url: spreadsheetUrl, createdNew } =
        await this.getOrCreateSpreadsheet(accessToken);

      const rowData = [
        new Date().toISOString(),
        profile.id,
        profile.fullName,
        profile.username ? `@${profile.username.replace(/^@/, "")}` : `@${profile.email.split("@")[0]}`,
        profile.email,
        profile.age != null ? profile.age : "N/A",
        profile.authProvider || "email_code_verified",
        profile.joinedDate || new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
        profile.level || 1,
        profile.xp || 0,
        profile.sparks || 0,
        profile.streakDays || 1,
        "Code-Verified Cadet",
      ];

      const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Registered Users!A:M:append?valueInputOption=USER_ENTERED`;
      
      const appendRes = await fetch(appendUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: [rowData],
        }),
      });

      if (!appendRes.ok) {
        // Fallback try sheet 1 append without tab title if needed
        const fallbackUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A:M:append?valueInputOption=USER_ENTERED`;
        const fbRes = await fetch(fallbackUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            values: [rowData],
          }),
        });

        if (!fbRes.ok) {
          const errorMsg = await fbRes.text();
          console.warn("Failed to append row to Google Sheet:", errorMsg);
          return {
            success: false,
            spreadsheetId,
            spreadsheetUrl,
            message: `Could not append to Google Sheet: ${errorMsg}`,
          };
        }
      }

      return {
        success: true,
        spreadsheetId,
        spreadsheetUrl,
        isNewSheet: createdNew,
        message: `Successfully synced user details to Google Sheet "${GOOGLE_SHEET_NAME}" on Google Drive!`,
      };
    } catch (err: any) {
      console.error("Google Sheets sync failed:", err);
      return {
        success: false,
        message: err.message || "Failed to sync to Google Drive spreadsheet.",
      };
    }
  }
}

export const googleSheetsService = GoogleSheetsService.getInstance();
