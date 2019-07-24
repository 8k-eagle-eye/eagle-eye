export default (touches: TouchList) =>
  ((touches[0].pageX - touches[1].pageX) ** 2 + (touches[0].pageY - touches[1].pageY) ** 2) ** 0.5
