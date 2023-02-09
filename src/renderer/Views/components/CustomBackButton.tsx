import './statics/backbutton.css';
type props = {
  onClick?: Function;
};
export default function CustomBackButton({ onClick = () => {} }: props) {
  return (
    <button
      className="back-arrow-button"
      onClick={() => {
        onClick();
      }}
    >
      <i className="back-arrow"></i>
      <span className="back-label">Back</span>
    </button>
  );
}
