export default function seeMore(module) {
  return {
    seeMoreInputProps: {
      id: `see-more__input--${module}`,
      type: 'checkbox',
      className: 'see-more__input',
      defaultChecked: false
    },
    seeMoreLabelProps: {
      htmlFor: `see-more__input--${module}`,
      className: 'see-more__label text--small icon-label'
    }
  }
}
