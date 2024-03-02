# ffmpeg 视频编辑指令

-   转化 mp4 编码为 h264
    -   ffmpeg -i input.mp4 -vcodec h264 output.mp4
    -   ffmpeg -i input.mp4 -codec copy -bsf: h264_mp4toannexb -f h264 output.mp4
-   裁剪
    -   ffmpeg -i v1.mp4 -vcodec h264 -strict -2 -vf crop=1920:790:0:110 v4.mp4
-   压缩
    -   ffmpeg -i input3.mp4 -vf "scale=iw/2:ih/2" output3.mp4
