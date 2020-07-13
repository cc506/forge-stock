import ForgeUI, { Image } from "@forge/ui"

const colors = [
    /* green:  */"#008000",
    /* darkred:  */"#8b0000",
    /* dark:  */"#333300"
];

const getSvg = (size) => (`
<svg version="1.2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="graph" aria-labelledby="title" role="img" height="500px" width="900px">

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
