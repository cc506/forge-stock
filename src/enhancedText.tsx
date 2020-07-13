import ForgeUI, { Image } from "@forge/ui"

const colors = [
    /* green:  */"#008000",
    /* darkred:  */"#8b0000",
    /* dark:  */"#333300"
];

const getColors = (text) =>{
  
}

const getSvg = (height, color, text) => (`
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
  version="1.1" id="Layer_1" x="0" y="0" xml:space="preserve" width="700px" height="${height}px">
  <text x="0" y="15" fill="${color}" font-family="sans-serif">${text}</text>
</svg>
`)

export const EnhancedText = ({height, color, text}) => (
  <Image src={`data:image/svg+xml;utf8,${encodeURIComponent(getSvg(height, color, text))}`} alt="s"/>
)