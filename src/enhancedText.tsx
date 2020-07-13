import ForgeUI, { Image } from "@forge/ui"

const colors = [
    /* green:  */"#008000",
    /* darkred:  */"#8b0000",
    /* dark:  */"#333300"
];

const getSvg = (size, weight, text) => (`
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
  version="1.1" id="Layer_1" x="0" y="0" xml:space="preserve" width="800px" height="20px">
  <text x="0" y="15" fill="${getColors(text)}" font-size="${size}" font-weight="${weight}" font-family="sans-serif">${text}</text>
</svg>
`)

const getColors = (text) =>{
  if(text.substring(0,1) == '+'){
      return colors[0];
  } else if(text.substring(0,1) == '-'){
      return colors[1];
  } else {
      return colors[2];
  }
}

export const EnhancedText = ({size, weight, text}) => (
  <Image src={`data:image/svg+xml;utf8,${encodeURIComponent(getSvg(size, weight, text))}`} alt="s"/>
)