import "../css/welcome.css";

type WelcomeProps = {
  loginButton: JSX.Element;
};

const Welcome = (props: WelcomeProps) => {
  return (
    <main>
      <div>
        <h1 className="large">{"Enhance your playlists with Nadja."}</h1>
        <p>
          Nadja generates playlists, improves the share function and creates a
          seamless experience in your queues
        </p>
        {props.loginButton}
      </div>
    </main>
  );
};

export default Welcome;
