import cheerio from 'cheerio';

export default function excerpt($) {
  let out = $('.markdown-body').children().slice(0, 6);
  return `
    ${out}
    <p>
      .... That was an excerpt. Want The full thing? <a href="https://www.ThinkingInReact.xyz#packages"> Buy It </a>
    </p>
  `;
}
