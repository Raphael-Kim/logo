import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "../../redux/modules/user";

const mapStateToProps = (state, ownProps) => {
//  const { photos: { feed } } = state;
  return {
//    feed
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logOut: (token) => {
            dispatch(userActions.setLogOut(token));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);