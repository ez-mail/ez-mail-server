const { serverOrigin } = require('../config');

module.exports = function getSubscriptionForm(accessToken) {
  return `
      <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/ez-mail/ez-mail-cdn@main/subscriptionForm.css">
      <div class="ez-wrapper">
        <button class="ez-close-button" type="button">X</button>
        <div class="ez-inner-wrapper">
          <p class="ez-title">새로운 소식을 빠르게 받아보세요!</p>
          <form action="${serverOrigin}/users/${accessToken}/external-subscriber" method="post" class="ez-form" novalidate>
            <div class="ez-input-wrapper">
              <label for="email" class="ez-label">이메일 주소</label>
              <input type="email" name="email" id="ez-email" class="ez-input" maxlength="30" required>
              <div class="ez-invalid-error" id="ez-email-invalid"><span id="ez-email-invalid-span" hidden>user@example.com 의 이메일 양식을 지켜주세요!</span></div>
            </div>
            <div class="ez-input-wrapper">
              <label for="name" class="ez-label">이름</label>
              <input type="text" name="name" id="ez-name" class="ez-input" maxlength="20" required>
              <div class="ez-invalid-error" id="ez-name-invalid"><span id="ez-name-invalid-span" hidden>이름을 알려주세요!</span></div>
            </div>
            <div>
              <button class="ez-button" type="submit">구독하기</button>
            </div>
          </form>
        </div>
      </div>
      <script src="https://cdn.jsdelivr.net/gh/ez-mail/ez-mail-cdn@main/subscriptionForm.js"></script>
  `;
};
