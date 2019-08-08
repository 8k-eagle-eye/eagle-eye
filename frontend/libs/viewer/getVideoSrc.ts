interface VideoSrcParams {
  baseUrl: string
  resolutionRatio: number
  gridIndexTop: number
  gridIndexLeft: number
}

export default ({ baseUrl, resolutionRatio, gridIndexTop, gridIndexLeft }: VideoSrcParams) =>
  `${baseUrl}/${resolutionRatio}k/${gridIndexTop + 1}-${gridIndexLeft + 1}.mp4`
