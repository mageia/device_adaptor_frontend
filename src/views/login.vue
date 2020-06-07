<template lang="html">
    <div class="login-container">
<!--        <div class="login-logo"></div>-->
        <form name="loginForm" class="login-form" novalidate>
            <div class="login-title">
<!--                <img style="height: 23px;" src="~@/assets/img/logo-gateway-white.png">-->
                <h4>登录</h4>
            </div>
            <label class="item-input">
                <input type="text" v-model="loginForm.username" placeholder="用户名" @focus="errorMsg = ''"
                    class="user-login-form" autocomplete="off" required/>
            </label>
            <label class="item-input type-item">
                <input :type="passwordType ? 'password' : 'text'" v-model="loginForm.password" :class="{'input-paw': loginForm.password, 'input-paw-open': !passwordType}"
                    placeholder="密码" @focus="errorMsg = ''" class="user-login-form" autocomplete="off"
                    required/>
                <button type="button" class="paw-btn" :class="{'paw-btn-open': !passwordType}" v-if="loginForm.password"
                    @click="passwordType = !passwordType"></button>
            </label>
            <p class="error-message">
                {{errorMsg}}
            </p>
            <button class="button" @click.prevent="submit">登录</button>
            <div class="mark"></div>
        </form>
    </div>
</template>

<script>
export default {
    // auth: false,
    // middleware: false,
    layout: "login",
    data() {
        return {
            loginForm: {
                username: "",
                password: ""
            },
            errorMsg: "",
            passwordType: true
        };
    },
    methods: {
        async submit() {
            if (!this.loginForm.username || !this.loginForm.password) {
                this.errorMsg = "用户名或密码不能为空！";
                return;
            }
            this.errorMsg = "";

            await this.$store.dispatch("user/LoginByUsername", {
                username: this.loginForm.username,
                password: this.loginForm.password
            });
            await this.$router.push({path: "/home"});
        }
    }
};
</script>

<style lang="less" scoped>
input::-webkit-input-placeholder {
    color: #fff;
}

input::-o-input-placeholder {
    color: #fff;
}

input::-moz-input-placeholder {
    color: #fff;
}

.login-container {
    position: absolute;
    bottom: 0;
    top: 0;
    width: 100%;
    background: #000;
    background-size: 100% 100%;

    .login-logo {
        width: 138px;
        height: 27px;
        margin: 47px 0 0 40px;
        background-size: contain;
    }

    .login-title {
        font-size: 18px;
        color: #e0e0e0;
        letter-spacing: 0;
        text-align: center;
        font-weight: 400;
        margin: 82px 0 38px 0;
    }

    .login-form {
        position: absolute;
        height: 442px;
        width: 353px;
        top: 50%;
        left: 50%;
        margin-left: -176px;
        margin-top: -221px;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.1);
        overflow: hidden;

        .item-input {
            display: block;
            position: relative;
        }

        .user-login-form {
            display: block;
            background: rgba(255, 255, 255, 0.1);
            height: 44px;
            width: 280px;
            line-height: 20px;
            margin: 0 auto 10px auto;
            padding: 12px;
            border: none;
            border-radius: 4px;
            font-size: 14px;
            color: #ffffff;

            &.isActive {
                box-shadow: 0 0 6px 3px #4a90e2;
            }
            &.input-paw {
                font-size: 32px;
            }
            &.input-paw-open {
                font-size: 14px;
            }
        }

        .paw-btn {
            padding: 0 20px;
            height: 44px;
            position: absolute;
            top: 0;
            right: 35px;
            background: url("~@/assets/img/password-close.png") no-repeat center
                center;
            background-size: 16px;
            outline: none;
            border: 0;

            &.paw-btn-open {
                background: url("~@/assets/img/password.png") no-repeat center
                    center;
                background-size: 16px;
            }
        }

        .button {
            display: block;
            width: 280px;
            height: 44px;
            line-height: 44px;
            background: #468aea;
            border-radius: 4px;
            margin: 0 auto;
            color: #fff;
            outline: none;
            border: 0;
            font-size: 16px;
        }
    }

    .error-message {
        font-size: 13px;
        color: #ff0000;
        padding: 4px 0 18px 37px;
        height: 18px;
        line-height: 18px;

        i {
            display: inline-block;
            width: 14px;
            height: 14px;
            background: url("/image/error.png") no-repeat top center;
            background-size: 14px;
            position: relative;
            top: 0.15rem;
            margin-right: 5px;
        }
    }
}
</style>
