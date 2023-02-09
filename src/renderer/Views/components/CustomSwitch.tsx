import './statics/switch.css';

type Props = {
  switchLabel: string;
  onFunc: Function;
};

export default function CustomSwitch({ switchLabel, onFunc }: Props) {
  return (
    <div>
      <label htmlFor="animate" className="switch-label">
        {switchLabel}:
      </label>
      <label className="switch">
        <input
          onChange={(e) => {
            e.target.checked ? onFunc(true) : onFunc(false);
          }}
          type="checkbox"
          id="animate"
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
}
