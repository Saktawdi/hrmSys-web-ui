<template>
    <page-container title="用户管理">
        <div>
            <el-card>
                <el-button v-if="permissions.indexOf('user.add') > -1 || permissions.indexOf('user.*') > -1" type="primary"
                    @click="addUser">新增用户</el-button>
            </el-card>
            <el-table :data="users" style="width: 100%">
                <el-table-column prop="uid" label="User ID"></el-table-column>
                <el-table-column prop="uname" label="Username"></el-table-column>
                <el-table-column prop="upassword" label="Password"></el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button v-if="permissions.indexOf('user.update') > -1 || permissions.indexOf('user.*') > -1"
                            type="primary" @click="editUser(scope.row)">编辑</el-button>
                        <el-button v-if="permissions.indexOf('user.delete') > -1 || permissions.indexOf('user.*') > -1"
                            type="danger" @click="deleteUser(scope.row.uid)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog v-model="dialogVisible" :title="optionKey + '用户'">
                <el-form :model="currentUser" :rules="userRules" ref="userForm" label-width="80px">
                    <el-form-item label="用户ID" prop="uid">
                        <el-input v-model="currentUser.uid"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名" prop="uname">
                        <el-input v-model="currentUser.uname"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="upassword">
                        <el-input v-model="currentUser.upassword" type="password"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="saveUser">保存</el-button>
                </div>
            </el-dialog>
        </div>
    </page-container>
</template>
  
<script>
import * as userApi from "../../api/user";
import { useUserStore } from '@/stores';
const userStore = useUserStore();

export default {
    data() {
        return {
            users: [],
            dialogVisible: false,
            currentUser: {},
            userRules: {
                uid: [{ required: true, message: 'UserID is required', trigger: 'blur' }],
                uname: [{ required: true, message: 'Username is required', trigger: 'blur' }],
                upassword: [{ required: true, message: 'Password is required', trigger: 'blur' }, { require: true, min: 3, max: 24, message: '长度在 8 到 24 个字符', trigger: 'blur' }]
            },
            permissions: [],
            optionKey: "" // 操作key
        };
    },
    methods: {
        getAllUsers() {
            userApi.getAllUsersService().then((response) => {
                this.users = response.data.data;
            }).catch((error) => {
                console.error('Error fetching users:', error);
            });
        },
        addUser() {
            this.currentUser = {};
            this.optionKey = "新增";
            this.dialogVisible = true;
        },
        editUser(user) {
            this.currentUser = { ...user };
            this.currentUser.upassword = "";
            this.optionKey = "编辑";
            this.dialogVisible = true;
        },
        saveUser() {
            this.$refs.userForm.validate((valid) => {
                if (valid) {
                    if (this.currentUser.uid) {
                        userApi.updateUserProfileService(this.currentUser).then(() => {
                            ElMessage.success('用户信息更新成功');
                            this.getAllUsers();
                            this.dialogVisible = false;
                        }).catch((error) => {
                            console.error('Error updating user profile:', error);
                        });
                    } else {
                        userApi.userRegisterService(this.currentUser).then(() => {
                            ElMessage.success('新增用户成功');
                            this.getAllUsers();
                            this.dialogVisible = false;
                        }).catch((error) => {
                            console.error('Error adding user:', error);
                        });
                    }
                } else {
                    ElMessage.error('Validation failed');
                }
            });
        },
        deleteUser(uid) {
            userApi.deleteUserByIdService(uid).then(() => {
                ElMessage.success('用户删除成功');
                this.getAllUsers();
            }).catch((error) => {
                console.error('Error deleting user:', error);
            });
        },
    },
    mounted() {
        this.getAllUsers();
        this.permissions = userStore.auth.permission;
    },
};
</script>
  
<style></style>