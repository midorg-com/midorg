module.exports = async (args, db, userId, ctx) => {

  let data = await ctx.cloud
    .deleteFile({
      fileList: [args.file]
    })
  return data
};
