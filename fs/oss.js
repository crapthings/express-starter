// aliyun oss

const OSS = require('ali-oss')
const { STS } = require('ali-oss')

const sts = new STS({
  accessKeyId: process.env.OSS_KEY,
  accessKeySecret: process.env.OSS_SECRET,
})

const oss = new OSS({
  accessKeyId: process.env.OSS_KEY,
  accessKeySecret: process.env.OSS_SECRET,
  region: process.env.OSS_REGION,
  bucket: process.env.OSS_BUCKET,
})

module.exports = {
  sts,
  oss
}
