const admin = require("firebase-admin");
/** firebase admin json파일 가져오기 */
const serviceAccount = require("./dev-wiiee-1e390-firebase-adminsdk-ba7cy-201f474f11.json");

// Firebase Admin SDK 초기화
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// FCM 메시지 보내기 함수
async function sendFcmMessage({ token, title, body, index, data }) {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    android: {
      // notification: { channel_id: "zamfit_01", },
      // sound: "zamfit_01", // .mp3 또는 .wav 확장자를 제외한 파일 이름
    },
    apns: {
      headers: {
        // (선택) 즉시 표시 우선도
        "apns-priority": "10",
      },
      payload: {
        aps: {
          "mutable-content": 1, // ← 이 한 줄이 NSE 실행 트리거
          // sound: "zamfit_01.wav", // .wav 파일 이름 (확장자 포함)
          // badge: 1, // 배지 카운터 지정 가능
        },
      },
      fcm_options: {
        // (선택) 리치 이미지 URL — HTTPS여야 함
        // image: "https://example.com/banner.png",
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
/**
 * ```
json: JSON.stringify({
    tabIndex: "HOME", // home tab 유지
    navigationType: "PUSH", 
    deeplink: "zamfit://how_to_use_point",
    routes: [
      // page 스택 쌓기
      {
        path: "/mafia/reservation",
        arg: {
          eventId: 1,
        },
      },
    ],
  }),
};
 * ```
 */
const data = {
  json: JSON.stringify({
    // tabIndex: "MY",
    // path: "https://applink.zamfit.kr/review/create?escapeId=1",
    path: "zamfit://main?tabIndex=MY&userProfileTabIndex=3",
    // deeplink: "zamfit://recruitments/detail/12",
    // routes: [
    //   {
    //     path: "/recruitments/detail/12",
    //   },
    // ],
  }),
};

const tokens = [
  "e0zHMMcpTcWOSwClZg8uX3:APA91bEMDPLM3s1Wqh3xNgZQSZskTZQTp29ZLujjBdrP_rOFA2oX03mv0BDc_rQ5Rfw1QnOnmEpu2QlxT6i9UpgnJOAt4zAemcblT8zxLJnst6aFWc_Z6jI",
];
tokens.map((token, index) => {
  sendFcmMessage({
    token,
    title: "안녕하세요 ",
    body: "바디입니다.",
    index,
    data,
  });
});
