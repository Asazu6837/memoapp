export default function translateErrors(code) {
    const error = { title: "エラー", description: "時間をおいてお試しください" };
    switch (code) {
        case "auth/invalid-email":
            error.description = "メールアドレスが不正です";
            break;
        case "auth/user-disabled":
            error.description = "アカウントが無効です";
            break;
        case "auth/user-not-found":
            error.description = "ユーザが見つかりません";
            break;
        case "auth/wrong-password":
            error.description = "パスワードが間違っています";
            break;
        case "auth/invalid-login-credentials":
            error.description = "パスワードが間違っています";
            break;
        case "auth/email-already-in-use":
            error.description = "登録済みのメールアドレスです";
            break;
        case "auth/operation-not-allowed":
            error.description = "開発者にお問い合わせください";
            break;
        case "auth/missing-email":
            error.description = "メールアドレスが設定されていません";
            break;
        case "auth/weak-password":
            error.description = "パスワードが簡単すぎます";
            break;
        case "auth/missing-password":
            error.description = "パスワードが設定されていません";
            break;
        default:
    }
    return error;
}
