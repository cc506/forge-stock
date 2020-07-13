import ForgeUI, { Image } from "@forge/ui"

const colors = [
    /* green:  */"#008000",
    /* darkred:  */"#8b0000",
    /* dark:  */"#333300"
];

const getSvg = (size) => (`
<svg version="1.2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="graph" aria-labelledby="title" role="img" height="500px" width="900px">
  <title id="title">A line chart showing some information</title>
<g class="grid x-grid" id="xGrid">
  <line x1="90" x2="90" y1="5" y2="371"></line>
</g>
<g class="grid y-grid" id="yGrid">
  <line x1="90" x2="705" y1="370" y2="370"></line>
</g>
  <g class="labels x-labels">
  <text x="100" y="400">2008</text>
  <text x="246" y="400">2009</text>
  <text x="392" y="400">2010</text>
  <text x="538" y="400">2011</text>
  <text x="684" y="400">2012</text>
  <text x="400" y="440" class="label-title">Year</text>
</g>
<g class="labels y-labels">
  <text x="80" y="15">15</text>
  <text x="80" y="131">10</text>
  <text x="80" y="248">5</text>
  <text x="80" y="373">0</text>
  <text x="50" y="200" class="label-title">Price</text>
</g>
<g class="data" data-setname="Our first data set">
  <circle cx="90" cy="192" data-value="7.2" r="4"></circle>
  <circle cx="240" cy="141" data-value="8.1" r="4"></circle>
  <circle cx="388" cy="179" data-value="7.7" r="4"></circle>
  <circle cx="531" cy="200" data-value="6.8" r="4"></circle>
  <circle cx="677" cy="104" data-value="6.7" r="4"></circle>
</g>
</svg>
`)

const getColors = (text) => {
    if (text.substring(0, 1) == '+') {
        return colors[0];
    } else if (text.substring(0, 1) == '-') {
        return colors[1];
    } else {
        return colors[2];
    }
}

export const Graph = ({ size }) => (
    <Image src={`data:image/svg+xml;utf8,${encodeURIComponent(getSvg(size))}`} alt="s" />
)