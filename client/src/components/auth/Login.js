import React, { Component } from "react";
import { Link, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import { connect, } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData);
  };
  render() {
    const { errors } = this.state;
    return (
      <>
        <div className="login-form">
        <div class="form-middle">
          <div class="form-inner">
          <h3>Log in with your email</h3>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                ty
                pe="email"
                className={classnames("", {
                  invalid: errors.email || errors.emailnotfound,
                })}
              />
              <span>
                {errors.email}
                {errors.emailnotfound}
              </span>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                className={classnames("", {
                  invalid: errors.password || errors.passwordincorrect,
                })}
              />
              <span>
                {errors.password}
                {errors.passwordincorrect}
              </span>
            </div>
            <div className="form-group">
              <button className="btn btn-danger btn-block" type="submit">
                Login
              </button>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
            </div>
          </form>
        </div>
        </div>
        </div>
      </>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));