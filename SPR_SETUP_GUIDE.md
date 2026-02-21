# Google Spreadsheet Setup Guide

To ensure the system works correctly, pleaase set up your Google Spreadsheet as follows:

## 1. Create Sheets and Headers

Create a new Google Spreadsheet and rename the sheets as follows:

### Sheet 1: `students_info`
This sheet stores the master list of students.
- **Header (Row 1):** `번호`, `이름`
- **Example Data:**
  | 번호 | 이름 |
  | :--- | :--- |
  | 1 | 김철수 |
  | 2 | 이영희 |

### Sheet 2: `students_action`
This sheet is where the AI will record behaviors. (The script will create this if it doesn't exist, but you can create it manually).
- **Header (Row 1):** `번호`, `이름`, `행동`, `기록시간`

## 2. Google Apps Script Deployment

1. In your spreadsheet, go to **Extensions > Apps Script**.
2. Delete any existing code and paste the content of `server/Code.gs`.
3. Go to **Project Settings** (gear icon).
4. Scroll down to **Script Properties** and add:
   - `GEMINI_API_KEY`: Your Google Gemini API Key.
   - `APP_AUTH_KEY`: `ss-action-recording-key-2026-safe-99` (This must match the `AUTH_KEY` in your `.env.local`)
5. Click **Deploy > New Deployment**.
6. Select **Type: Web App**.
7. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
8. Click **Deploy** and **copy the Web App URL**. You will need this for the `.env.local` file.
