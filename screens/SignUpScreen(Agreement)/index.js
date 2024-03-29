import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "../../redux/modules/user";

const mapStateToProps = (state, ownProps) => {
    const { user: { userInfo } } = state;
    return {
        userInfo
    };
};
    
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logIn: () => {
            dispatch(userActions.setLogIn());
        },
        setUserProfile: (userProfile) => {
            dispatch(userActions.setUserProfile(userProfile));
        }
    };
};
    
export default connect(mapStateToProps, mapDispatchToProps)(Container);