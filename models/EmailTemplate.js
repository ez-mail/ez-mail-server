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
        '{"emailBodyStyle":{"backgroundColor":"#f5f5f5"},"emailContainerStyle":{"backgroundColor":"white","borderWidth":"0px","borderColor":"black","borderStyle":"solid"},"emailFooter":{"companyOrUserName":"발신자 설정페이지에서 회사이름을 설정해주세요","contact":"발신자 설정페이지에서 전화번호를 설정해주세요","address":"발신자 설정페이지에서 주소를 설정해주세요","boxStyle":{"paddingTop":"25px","paddingBottom":"25px","textAlign":"center","fontSize":"12px","color":"#757575","lineHeight":"24px"}},"emailContents":[{"id":"default-space-7184","type":"spacer","boxStyle":{"backgroundColor":"#FFFFFF","borderWidth":"0px","borderColor":"#000000","borderStyle":"solid","height":"50px"}}]}',
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
