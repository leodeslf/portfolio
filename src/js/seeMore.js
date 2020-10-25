export default function seeMore(module) {
  return {
    input: {
      id: `see-more__input--${module}`,
      type: 'checkbox',
      className: 'see-more__input',
      defaultChecked: false
    },
    label: {
      htmlFor: `see-more__input--${module}`,
      className: 'see-more__label text--small icon-label'
    }
  }
}
