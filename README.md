# MGC TaskFlow

Next.js (App Router) をベースにした次世代タスク管理システム。
`clawd/memory/tasks.json` を直接読み書きすることで、OpenClawエージェントとの完全なデータ同期を実現します。

## 技術スタック
- **Frontend**: Next.js 15+, Tailwind CSS 4, shadcn/ui
- **Backend**: Next.js API Routes (Route Handlers)
- **Data**: Local JSON (`memory/tasks.json`)

## ローカル実行方法
```bash
cd mgc-taskflow
npm install
npm run dev
```
ブラウザで `http://localhost:3000` を開いてください。

## Vercelへのデプロイ手順
1. **GitHubリポジトリの作成**: このディレクトリ (`mgc-taskflow`) をGitHubにプッシュします。
2. **Vercel連携**: Vercelダッシュボードからプロジェクトをインポートします。
3. **注意点**: 現在の実装はローカルファイル (`/Users/...`) を参照しているため、Vercel上では動作しません。
   - 恒久的な運用の場合は、DB (PostgreSQL / Supabase等) への移行、または GitHub API を経由した `tasks.json` の更新ロジックに切り替える必要があります。

## ソースコード
- 場所: `/Users/kokomumatsuo/clawd/mgc-taskflow`
- メイン画面: `src/app/page.tsx`
- APIロジック: `src/app/api/tasks/route.ts`
