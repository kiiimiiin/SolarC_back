const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// 알림을 보낼 함수를 정의합니다.
function sendNotification(title, body, token) {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: token,
  };

  return admin.messaging().send(message);
}

exports.sendNotificationOnViolenceCountChange = functions.database
  .ref("/violence_count")
  .onWrite((change, context) => {
    const newValue = change.after.val();
    const oldValue = change.before.val();
    const token = "fNAGYrRCRa2pksCxV98-HZ:APA91bFSrfj6OTGbwHQH9cIkSIWr6qCRz_8p7Jj3xVIp3VWyNi6ae_L84NvviHreZ4Nz37jEOKDqvOkyX9zxBW9fFDkVu7wD2U7kEnKkb0dIOfjuINSfzBU5GO81yDzNiv2sqR7Icc50";
    // 안드로이드 시뮬레이터 토큰 : fNAGYrRCRa2pksCxV98-HZ:APA91bFSrfj6OTGbwHQH9cIkSIWr6qCRz_8p7Jj3xVIp3VWyNi6ae_L84NvviHreZ4Nz37jEOKDqvOkyX9zxBW9fFDkVu7wD2U7kEnKkb0dIOfjuINSfzBU5GO81yDzNiv2sqR7Icc50
    if (newValue !== oldValue && newValue > 0) { // 0이 아니고 변경될 때만 알림을 보냅니다.
      return sendNotification("폭력 행위 감지", "폭력 행위가 예상됩니다. 확인해주세요!", token);
    } else {
      return null;
    }
  });

exports.sendNotificationOnFireCountChange = functions.database
  .ref("/fire_count")
  .onWrite((change, context) => {
    const newValue = change.after.val();
    const oldValue = change.before.val();
    const token = "fNAGYrRCRa2pksCxV98-HZ:APA91bFSrfj6OTGbwHQH9cIkSIWr6qCRz_8p7Jj3xVIp3VWyNi6ae_L84NvviHreZ4Nz37jEOKDqvOkyX9zxBW9fFDkVu7wD2U7kEnKkb0dIOfjuINSfzBU5GO81yDzNiv2sqR7Icc50";

    if (newValue !== oldValue && newValue > 0) {
      return sendNotification("화재 및 연기 감지", "화재가 예상됩니다. 확인해주세요!", token);
    } else {
      return null;
    }
  });

exports.sendNotificationOnWeaponCountChange = functions.database
  .ref("/weapon_count")
  .onWrite((change, context) => {
    const newValue = change.after.val();
    const oldValue = change.before.val();
    const token = "fNAGYrRCRa2pksCxV98-HZ:APA91bFSrfj6OTGbwHQH9cIkSIWr6qCRz_8p7Jj3xVIp3VWyNi6ae_L84NvviHreZ4Nz37jEOKDqvOkyX9zxBW9fFDkVu7wD2U7kEnKkb0dIOfjuINSfzBU5GO81yDzNiv2sqR7Icc50";

    if (newValue !== oldValue && newValue > 0) {
      return sendNotification("흉기 소지 감지", "흉기 소지가 예상됩니다. 확인해주세요!", token);
    } else {
      return null;
    }
  });
