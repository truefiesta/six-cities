import * as React from "react";
import {connect} from "react-redux";
import {getErrorMessage} from "../../reducer/error/selectors";

interface Props {
  errorMessage: string;
}

const errorStyle: React.CSSProperties = {
  backgroundColor: `#e23939`,
  width: `100%`,
  padding: `5px`,
  color: `#fff`,
  textAlign: `center`,
  lineHeight: `15px`,
  fontSize: `15px`,
  boxShadow: `0px 2px 14px 0px rgba(0,0,0,0.34)`,
  position: `fixed`,
  zIndex: 1,
};

const ErrorBanner: React.FunctionComponent<Props> = (props: Props) => {
  const {errorMessage} = props;
  const isError = errorMessage !== ``;

  return (
    isError && <div style={errorStyle}>{errorMessage}</div>
  );
};

const mapStateToProps = (state) => ({
  errorMessage: getErrorMessage(state),
});

export {ErrorBanner};
export default connect(mapStateToProps)(ErrorBanner);
