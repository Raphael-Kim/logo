import { connect } from "react-redux";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
    const { user: { userInfo } } = state;
    console.log(userInfo, 'SignUp1');
    return {
        userInfo
    };
};
    
const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    };
};
    
export default connect(mapStateToProps, mapDispatchToProps)(Container);