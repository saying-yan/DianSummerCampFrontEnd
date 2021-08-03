<template>
  <div class="login-page">
	<el-button class="head-button" type="primary" round @click="toMinePage">返回</el-button>
    <div class="login-box">
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
		label-position="left"
        label-width="70px"
        class="login-form"
      >
        <el-form-item label="用户名" prop="username" >
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            type="password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" :plain="true" @click="login">登录</el-button>
          <el-button @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
	  <el-link type="primary" class="register-link" @click="toRegisterPage">没有账号？立刻注册</el-link>
	  <el-link type="primary" class="register-link" @click="toRegisterPage">没有账号？立刻注册</el-link>
    </div>
  </div>
</template>

<script>
export default {
	name:'Login',
	data() {
		return {
			loginForm: {
				username: "",
				password: ""
			},
			loginFormRules: {
				username: [
					{ required: true, message: "请输入用户名", trigger: "blur" },
					{ min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
				],
				password: [
					{ required: true, message: "请输入密码", trigger: "blur" },
					{ min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
				]
			},
			isLogin: false,
		}
	},
	methods: {
		resetLoginForm() {
			this.$refs.loginFormRef.resetFields();
		},
		login() {
			this.$refs.loginFormRef.validate(async (isvalid, field) => {
				if (!isvalid) return;
				this.$store.dispatch('login', this.loginForm)
					.then(token => {
						// console.log('token')
						// console.log(token)
						this.isLogin = true
						localStorage.setItem('islogin', 1)
						localStorage.setItem('token', token)
						this.$router.replace('/Mine')
					})
					.catch(err => alert('登录失败，请检查用户名或密码'))
			})
		},
		toRegisterPage() {
			this.$router.replace('register')
		},
		toMinePage() {
			this.$router.replace('/Mine')
		}
	},
	mounted() {
		if (localStorage.getItem('isLogin') != null) {
			this.isLogin = localStorage.getItem('isLogin')
		}
	}
}
</script>

<style scoped>
	.login-page {
	  color: #3f362b;
	  text-align: center;
	  height: 100vh;
	  padding: 0 10px;
	}
	.login-box {
	  width: 95vw;
	  height: 35vh;
	  background-color: rgb(70, 66, 66);
	  border-radius: 12px;
	  position: absolute;
	  top: 50%;
	  left: 50%;
	  transform: translate(-50%, -50%);
	}
	.login-form {
	  position: absolute;
	  top: 5vh;
	  width: 100%;
	  padding: 0 10px;
	  box-sizing: border-box;
	}
	.btns {
	  display: flex;
	  width: 100%;
	  justify-content: flex-start;
	}
	.register-link {
		position: absolute !important;
		bottom: 0;
	}
</style>
