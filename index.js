const admin = require("firebase-admin");
/** firebase admin json파일 가져오기 */
const serviceAccount = require("./firebase admin json파일");

// Firebase Admin SDK 초기화
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// FCM 메시지 보내기 함수
async function sendFcmMessage(token, title, body, index) {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    android: {
      notification: {
        channel_id: "channel_01",
        sound: "push_notification", // .mp3 또는 .wav 확장자를 제외한 파일 이름
      },
    },
    apns: {
      payload: {
        aps: {
          sound: "push_notification.wav", // .wav 파일 이름 (확장자 포함)
          badge: 1, // 배지 카운터 지정 가능
        },
      },
    },
    data,
    token: token,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Successfully sent message:", response);
  } catch (error) {
    console.error(`${index}번째 배열 Error sending message:`, error);
  }
}

const pathList = [
  "/battle?initialIndex=1",
  "/battle/QarVMZmgwte4SCesEsS0/inProgress?initialIndex=2",
];

const data = {
  pathList: JSON.stringify(pathList),
};

const tokens = [
  "dGiYzYCfRPCg_dvM8LyFZJ:APA91bE6cMEFjHBjE-56sUBghBcrK8CaCBwoDw76QkQcz5PBXSBWbF_N-EPrTv2YEHLIkm-Pp_ENG5opEnPAD5D-mj8eDL3dl_YgktLkjDQkjF7dvQRlqJ5K05nsVD2th32bLXMiHheH",
];

tokens.map((e, index) => {
  sendFcmMessage(e, "안녕하세요 ", "바디입니다.", index);
});
