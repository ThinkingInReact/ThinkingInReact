export default function preview(req, res) {
  let template = `
    <div class="Preview">
      <em>Note:</em> this is just a preview. To view the full version <a href="https://www.ThinkingInReact.xyz/#login">login</a> or <a href="https://www.ThinkingInReact.xyz#packages"> Buy It </a>
    </div>
  `

  return template;
}
