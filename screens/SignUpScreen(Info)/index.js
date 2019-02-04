import { connect } from "react-redux";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
    console.log('mapStateToProps from SignUpScreen');
    const { user: { userInfo } } = state;
    return {
        userInfo
    };
};
    
export default connect(mapStateToProps, null)(Container);