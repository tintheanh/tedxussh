const modules = {
  toolbar: [
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ script: 'sub'}, { script: 'super' }],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    [{ color: [] }, { background: [] }],
    ['link', 'image'],
    ['clean']
  ]
}

const formats = [
  'size',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'script',
  'list',
  'bullet',
  'indent',
  'color',
  'background',
  'link',
  'image'
]

export { modules, formats }
