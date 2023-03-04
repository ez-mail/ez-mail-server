const mongoose = require('mongoose');

const emailTemplateSchema = new mongoose.Schema(
  {
    editingStep: {
      type: String,
      default: '01',
    },
    emailTitle: {
      type: String,
      default: '제목없음',
    },
    emailContent: {
      type: String,
      default:
        '{"emailBodyStyle":{"backgroundColor":"#f5f5f5"},"emailContainerStyle":{"backgroundColor":"white","borderWidth":"0px","borderColor":"black","borderStyle":"solid","fontFamily":"AppleSDGothic, "apple sd gothic neo", "noto sans korean", "noto sans korean regular", "noto sans cjk kr", "noto sans cjk", "nanum gothic", "malgun gothic", dotum, arial, helvetica, sans-serif"},"emailFooter":{"companyOrUserName":"발신자 설정페이지에서 회사이름을 설정해주세요","contact":"발신자 설정페이지에서 전화번호를 설정해주세요","address":"발신자 설정페이지에서 주소를 설정해주세요","boxStyle":{"paddingTop":"25px","paddingBottom":"25px","textAlign":"center","fontSize":"12px","color":"#757575","lineHeight":"24px"}},"emailContents":[{"id":"default-text-content-7184","type":"text","content":"왼쪽에서 원하는 도구 상자를 끌어다 놓으세요!","boxStyle":{"backgroundColor":"#FFFFFF","borderWidth":"0px","borderColor":"#000000","borderStyle":"solid","paddingTop":"15px","paddingBottom":"15px","paddingLeft":"0px","paddingRight":"0px","textAlign":"center"},"contentStyle":{"fontSize":"24px","fontFamily":"AppleSDGothic, "apple sd gothic neo", "noto sans korean", "noto sans korean regular", "noto sans cjk kr", "noto sans cjk", "nanum gothic", "malgun gothic", dotum, arial, helvetica, sans-serif"}}]}',
    },
    sender: {
      type: String,
      required: true,
    },
    emailPreviewText: {
      type: String,
      default: '',
    },
    recipients: [
      {
        email: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        adAgreement: {
          type: Boolean,
          required: true,
          default: false,
        },
        isEmailOpen: {
          type: Boolean,
          required: true,
        },
      },
    ],
    totalSendCount: {
      type: Number,
    },
    successSendCount: {
      type: Number,
    },
    startSendDate: {
      type: Date,
    },
    endSendDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('EmailTemplate', emailTemplateSchema);
