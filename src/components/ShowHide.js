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
        className="show-hide__label icon__label"
        htmlFor={`expandable__input--${id}`}
      >
        <span className="icon icon--21">
          <svg viewBox="0 0 21 21">
            <path d="M10.5,6.5l-6,6l1.4,1.4l4.6-4.6l4.6,4.6l1.4-1.4L10.5,6.5z" />
          </svg>
        </span>
      </label>
      <div className="show-hide__content">
        {content}
      </div>
    </>
  );
}
