export default function ShowHide({ id, defaultChecked, content }) {
  return (
    <>
      <input
        type="checkbox"
        className="show-hide__input"
        id={`expandable__input--${id}`}
        defaultChecked={defaultChecked}
        style={{ display: "none" }}
      />
      <label
        className="show-hide__label"
        htmlFor={`expandable__input--${id}`}
      >
      </label>
      <div className="show-hide__content">
        {content}
      </div>
    </>
  );
}
