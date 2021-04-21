export default function seeMore(module, checked = false) {
  return {
    seeMoreInputProps: {
      id: `see-more__input--${module}`,
      type: 'checkbox',
      className: 'see-more__input',
      defaultChecked: checked
    },
    seeMoreLabelProps: {
      htmlFor: `see-more__input--${module}`,
      className: 'see-more__label text--small icon-label'
    }
  }
}
