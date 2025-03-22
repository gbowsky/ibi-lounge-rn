export function convertToHex(rgb: string) {
  if (rgb.includes("#")) return rgb;

  let sep = rgb.indexOf(",") > -1 ? "," : " ";
  // Turn "rgb(r,g,b)" into [r,g,b]

  const rgb_arr = rgb
    .split(sep)
    .map((a) =>
      a
        .replaceAll("(", "")
        .replaceAll(")", "")
        .replaceAll("rgb", "")
        .replaceAll("a", "")
        .trim(),
    );

  let r = (+rgb_arr[0]).toString(16),
    g = (+rgb_arr[1]).toString(16),
    b = (+rgb_arr[2]).toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
}
