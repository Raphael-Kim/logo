import { connect } from "react-redux";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
    const { user: { userInfo } } = state;
    return {
        userInfo
    };
};
    
const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    };
};
    
export default connect(mapStateToProps, mapDispatchToProps)(Container);