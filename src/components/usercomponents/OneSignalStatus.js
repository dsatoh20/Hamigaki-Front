var OneSignal = window.OneSignal || [];

const handleCheckStatus = () => {
    if (OneSignal) {
        OneSignal.push(function() {
            // 通知が有効か確認
            OneSignal.isPushNotificationsEnabled(function(isEnabled) {
                if (isEnabled) {
                    alert("通知は有効になっています！");
                } else {
                    alert("通知は無効です。ぜひ有効化してください。リマインダーを送りますよ。");
                    OneSignal.showSlidedownPrompt();
                }
            });
        });
    } else {
        alert("OneSignalが初期化されていません。");
    }
};

export default handleCheckStatus;
