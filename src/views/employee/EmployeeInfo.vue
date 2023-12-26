<template>
    <page-container :title="'档案详细'">
        <div>
            <el-form :model="form" :rules="rules" ref="hrForm" label-width="100px"
                action="/hr/hr_archives_manage/hr_archives_register" method="post">
                <!-- 第一行 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="I级机构" prop="el1InstID">
                            <el-select v-model="form.el1InstID" placeholder="请选择" disabled="true">
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="Ⅱ级机构" prop="el2InstID">
                            <el-select v-model="form.el2InstID" placeholder="请先选择上级机构" disabled="true">
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="Ⅲ级机构" prop="el3InstID">
                            <el-select v-model="form.el3InstID" placeholder="请先选择上级机构" disabled="true">
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- 第二行 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="职位分类" prop="epositionCategory">
                            <el-select v-model="form.epositionCategory" placeholder="请选择" disabled="true">

                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="职位名称" prop="epositionName">
                            <el-select v-model="form.epositionName" placeholder="请先选择分类" disabled="true">

                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="职称" prop="ejobTitle">
                            <el-input v-model="form.ejobTitle"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- 第三行 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="头像" prop="avatar">
                            <el-upload class="avatar-uploader" action="https://www.freeimg.cn/api/v1/upload"
                                :show-file-list="false" :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload" :headers="headerObj">
                                <img v-if="form.eavatar" :src="form.eavatar" class="avatar" />
                                <el-icon v-else class="avatar-uploader-icon">
                                    <Plus />
                                </el-icon>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="姓名" prop="ename">
                            <el-input v-model="form.ename"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="性别" prop="egender">
                            <el-select v-model="form.egender">
                                <el-option label="男" value="男"></el-option>
                                <el-option label="女" value="女"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- 第四行 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="EMAIL" prop="email">
                            <el-input v-model="form.email"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="固定电话" prop="efixedPhone">
                            <el-input v-model="form.efixedPhone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="QQ" prop="eqq">
                            <el-input v-model="form.eqq"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <!-- 第五行 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="手机" prop="ecellPhone">
                            <el-input v-model="form.ecellPhone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="住址" prop="eaddress">
                            <el-input v-model="form.eaddress"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="邮编" prop="epostcode">
                            <el-input v-model="form.epostcode"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <!-- 第六行 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="国籍" prop="ecountry">
                            <el-input v-model="form.ecountry"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="出生地" prop="ebirthplace">
                            <el-input v-model="form.ebirthplace"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="生日" prop="ebirthday">
                            <el-date-picker v-model="form.ebirthday" type="date"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="年龄" prop="eage">
                            <el-input v-model="form.eage"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="爱好" prop="ehobby">
                            <el-input v-model="form.ehobby"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="民族" prop="eethnic">
                            <el-select v-model="form.eethnic">
                                <el-option label="汉" value="汉"></el-option>
                                <el-option label="回" value="回"></el-option>
                                <el-option label="满" value="满"></el-option>
                                <el-option label="藏" value="藏"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="宗教信仰" prop="ereligion">
                            <el-input v-model="form.ereligion"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="政治面貌" prop="epolitical">
                            <el-input v-model="form.epolitical"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <!-- 第八行 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="身份证号" prop="eidcard">
                            <el-input v-model="form.eidcard" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="社会保障号码" prop="essc">
                            <el-input v-model="form.essc"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <!-- 第九行 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="学历" prop="eeducation">

                            <el-select v-model="form.eeducation">
                                <el-option label="博士" value="博士"></el-option>
                                <el-option label="硕士" value="硕士"></el-option>
                                <el-option label="本科" value="本科"></el-option>
                                <el-option label="专科" value="专科"></el-option>
                                <el-option label="高中" value="高中"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="专业" prop="emajor">
                            <el-input v-model="form.emajor"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="特长" prop="especicalty">
                            <el-input v-model="form.especicalty"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- 第十行 -->
                <!-- TODO:注意，这里是用的sbasic作为选值 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="薪酬标准" prop="esalary">
                            <el-select v-model="form.esalary" placeholder="请选择">
                                <el-option v-for="item in salaryBasic" 
                                    :key="item.sid" 
                                    :label="item.sbasic"
                                    :value="item.sbasic">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="开户银行" prop="ebankName">
                            <el-input v-model="form.ebankName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="银行账号" prop="ebankAccount">
                            <el-input v-model="form.ebankAccount" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="简历" prop="eresume">
                            <el-input v-model="form.eresume" type="textarea" rows="10" cols="50"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="家庭关系" prop="efamily">
                            <el-input v-model="form.efamily" type="textarea" rows="10" cols="50"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="备注" prop="eremarks">
                            <el-input v-model="form.eremarks" type="textarea" rows="10" cols="50"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <el-form-item label="登记人：">
                            <el-input v-model="form.erecoders" disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="option_box">
                    <el-button class="button_submit" type="primary" @click="submitForm">{{ activeName }}</el-button>
                    <el-button class="button_submit" type="info" @click="cancel">取消</el-button>
                </div>
            </el-form>
        </div>
    </page-container>
</template>

<script>
import * as salary from "../../api/salary"
import {updateEmployeeService,approveEmployeeService} from "../../api/employee"

export default {
    data() {
        return {
            form: {
                erecoders: "-1",
                eavatar: "",
                egender: "男",
                eethnic: "汉",
                eeducation: "本科",
            },
            activeCode: "", //方法
            activeName: "",
            parentPath: "",
            salaryBasic: [], // 基础薪酬工资
        }
    },
    created() {
        const formDataString = this.$route.query.formData;
        this.activeCode = this.$route.query.functionKey;
        this.parentPath = this.$route.query.pathKey
        if (this.activeCode === "update") {
            this.activeName = "变更"
        } else if (this.activeCode === "review") {
            this.activeName = "复核通过"
        }
        if (formDataString) {
            const formData = JSON.parse(formDataString);
            this.form = formData
        }
    },
    mounted() {
        this.fetchSalaryList();
    },
    methods: {
        cancel() {
            this.$router.push(this.parentPath)
        },
        async fetchSalaryList() {
            await salary.getSalaryByStatusService(1)
                .then((response) => {
                    this.salaryBasic = response.data.data;
                    this.salaryBasic.forEach(item => {
                        if (item.sid.toString() === this.form.esalary) {
                            this.form.esalary = item.sbasic
                        }
                    });
                })
                .catch((error) => {
                    ElMessage.error('获取薪资列表时出错:', error);
                });
        },
        submitForm(){
            this.$refs.hrForm.validate((valid) => {
                if(valid){
                    //转换成编号
                    this.salaryBasic.forEach(item => {
                        if (item.sbasic === this.form.esalary) {
                            this.form.esalary = item.sid
                        }
                    });
                    if (this.activeCode === "update"){
                        this.form.estatus = 0
                        updateEmployeeService(this.form)
                        .then((response)=>{
                            ElMessage.success(response.data.msg);
                            this.cancel();
                        })
                        .catch((error) => {
                            ElMessage.error("更新出错：",error);
                        })
                    }else if(this.activeCode === "review"){
                        approveEmployeeService(this.form)
                        .then((response)=>{
                            ElMessage.success(response.data.msg);
                            this.cancel();
                        })
                        .catch((error) => {
                            ElMessage.error("复核通过时出错：",error);
                        })
                    }
                }
            })
        }
    }
}
</script>

<style>
.avatar {
    max-height: 64px;
    max-width: 64px;
}

.avatar-uploader-icon {
    width: 64px;
    height: 64px;
    border: 1px solid;
}

.option_box {
    text-align: center;
}

.button_submit {
    width: 30%;
    margin-right: 10px;
    /* 可选：如果你希望按钮之间有一些间隔，可以添加一些 margin */
}
</style>