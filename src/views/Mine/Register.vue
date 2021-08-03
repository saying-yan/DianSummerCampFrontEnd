<template>
  <div class="register-page">
	<el-button class="head-button" type="primary" round @click="toMinePage">返回</el-button>
    <div class="register-box">
      <el-form
        ref="registerFormRef"
        :model="registerForm"
        :rules="registerFormRules"
		label-position="left"
        label-width="80px"
        class="Register-form"
      >
		<el-form-item label="手机号" prop="phone" >
		  <el-input
		    v-model="registerForm.phone"
		    prefix-icon="el-icon-phone"></el-input>
		</el-form-item>
        <el-form-item label="用户名" prop="username" >
          <el-input
            v-model="registerForm.username"
            prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="registerForm.password"
            prefix-icon="el-icon-lock"
            type="password"></el-input>
        </el-form-item>
		<el-form-item label="确认密码" prop="retypePassword" >
		  <el-input
		    v-model="registerForm.retypePassword"
		    prefix-icon="el-icon-lock"
			type="password"></el-input>
		</el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" :plain="true" @click="register">注册</el-button>
          <el-button @click="resetRegisterForm">重置</el-button>
        </el-form-item>
      </el-form>
	  <el-link type="primary" class="login-link" @click="toLoginPage">已有账号？直接登录</el-link>
    </div>
  </div>
</template>

<script>
export default {
	name:'Register',
	data() {
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'))
			} else {
				if (this.registerForm.checkPass !== '') {
					this.$refs.registerFormRef.validateField('retypePassword');
				}
				callback();
			}
		}
		
		var validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.registerForm.password) {
				console.log(value)
				console.log(this.registerForm.password)
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		}
		
		return {
			registerForm: {
				phone: "",
				username: "",
				password: "",
				retypePassword: "",
			},
			registerFormRules: {
				phone: [
					{ required: true, message: "请输入手机号", trigger: "blur" },
					{ min: 11, max: 11, message: '长度为 11 个字符', trigger: 'blur' }
				],
				username: [
					{ required: true, message: "请输入用户名", trigger: "blur" },
					{ min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
				],
				password: [
					{ required: true, message: "请输入密码", trigger: "blur" },
					{ validator: validatePass, trigger: 'blur' },
					{ min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
				],
				retypePassword: [
					{ required: true, message: "请输入密码", trigger: "blur" },
					{ validator: validatePass2, trigger: 'blur' }
				]
			}
		}
	},
	methods: {
		resetRegisterForm() {
			this.$refs.registerFormRef.resetFields();
		},
		register() {
			this.$refs.registerFormRef.validate(async (isvalid, field) => {
				if (!isvalid) return;
				this.$store.dispatch('register', this.registerForm)
					.then(res => {
						console.log(res)
						this.$router.push('login')
					})
					.catch(err => console.log(err))
			})
		},
		toLoginPage() {
			this.$router.push('login')
		},
		toMinePage() {
			this.$router.replace('/Mine')
		}
	},
	mounted() {
		console.log(1)
	}
}
</script>

<style>
	.register-page {
	  color: #3f362b;
	  text-align: center;
	  height: 100vh;
	  padding: 0 10px;
	}
	.register-box {
	  width: 95vw;
	  height: 55vh;
	  background-color: rgb(70, 66, 66);
	  border-radius: 12px;
	  position: absolute;
	  top: 50%;
	  left: 50%;
	  transform: translate(-50%, -50%);
	}
	.Register-form {
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
	.login-link {
		position: absolute !important;
		bottom: 0;
	}
</style>
