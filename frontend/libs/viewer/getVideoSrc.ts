interface VideoSrcParams {
  baseUrl: string
  resolutionRatio: number
  gridIndexTop: number
  gridIndexLeft: number
}

export default ({ baseUrl, resolutionRatio, gridIndexTop, gridIndexLeft }: VideoSrcParams) =>
  `${baseUrl}/videos/${resolutionRatio === 1 ? 'hd' : `${resolutionRatio}k`}/${gridIndexTop +
    1}-${gridIndexLeft + 1}.mp4`
