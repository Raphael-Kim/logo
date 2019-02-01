import { connect } from "react-redux";
import RootContainer from "./presenter";
import { actionCreators as userActions } from "../../redux/modules/user";

const mapStateToProps = (state, ownProps) => {
    const { user } = state;
    return {
        isLoggedIn: user.isLoggedIn // isLoggedIn을 subscribe()한 후 계속 listen해야함
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        checkTokenForKakao: () => {
            dispatch(userActions.checkTokenForKakao());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);