---
title: backend 基础知识点
published: 2026-04-23
description: '熟悉框架'
image: '/assets/desktop-banner/8.png'
tags: [自主学习]
category: '知识点'
draft: false 
lang: 'zh-CN'
---


#  项目代码解析日志


## 1. 项目整体框架

这是一个典型的 `Spring Boot + Spring MVC + Spring Data JPA + MySQL` 后端分层项目。

- Spring Boot: 
  - 后端开发主流框架。
  - 配置文件通常放在application.properties或application.yml。
  - 主类使用@SpringBootApplication注解启动Spring上下文。
- Spring MVC:  
  - C:控制器(@Controller或@RestController)处理HTTP请求。
  - V:视图层负责返回页面或JSON响应。
  - M:服务层(@Service)封装业务逻辑；数据层(@Entity)；数据持久层(@Repository)。
  - 依赖注入(@Autowired)实现组件解耦。
- JPA与数据库交互:
  - 实体类用@Entity注解映射数据库表。
  - Repository接口继承JpaRepository提供CRUD操作。
  - 使用Jpa查询方法命名或@Query自定义SQL。
  - 事务管理通过@Transactional注解控制:updateStudentById 中多个数据库操作要么一起成功，要么失败回滚，保证数据一致性。
- MySQL: 本地部署禁用SSL(网络安全加密协议)方便快捷。

整体调用链：

`HTTP请求 -> Controller控制层 -> Service业务层 -> Repository数据访问层 -> Entity实体层 -> MySQL数据库`

辅助结构：

* `Entity/dao`：数据库表映射对象
* `DTO`：接口输入输出对象
* `Converter`：Entity 和 DTO 的转换层
* `Response`：统一返回结构
* `DemoApplication`：Spring Boot 启动入口
* `application.properties`：运行配置
* `pom.xml`：依赖管理和构建配置

## 2. 目录结构说明

项目根目录：`D:\demo\demo`

* `.idea`：IDEA 工程配置
* `.mvn`：Maven Wrapper 配置
* `src/main/java`：正式业务代码
* `src/main/resources`：配置文件和资源目录
* `src/test/java`：测试代码
* `target`：编译产物目录
* `pom.xml`：Maven 构建配置文件
* `mvnw` / `mvnw.cmd`：Maven Wrapper 启动脚本

## 3. 分层职责说明

### 3.1 启动层

文件：`src/main/java/com/example/demo/DemoApplication.java`

作用：

* Spring Boot 项目启动入口
* 启动 IOC 容器
* 自动扫描 Bean
* 加载配置和自动装配

知识点：

* `@SpringBootApplication`
* 自动配置
* 组件扫描
* `SpringApplication.run(...)`

### 3.2 控制层 Controller

文件：

* `src/main/java/com/example/demo/TestController.java`
* `src/main/java/com/example/demo/Controller/StudentController.java`

作用：

* 接收 HTTP 请求
* 解析路径参数、查询参数、请求体
* 调用 Service 层
* 返回统一响应对象

知识点：

* `@RestController`:
  - 含义：@Controller + @ResponseBody。  
  - 用途：方法返回值直接序列化成 JSON/文本返回给前端（不是跳页面）。
* `@PutMapping` 、 `@DeleteMapping` 、`@PostMapping`、 `@GetMapping`：
  - 含义：把 HTTP 方法 + URL 路径映射到 Java 方法。  
  - 用途：定义 RESTful API：增、删、改、查。
* `@PathVariable`:
  - 含义：从 URL 路径取参数，如 /student/1 里的 1。  
  - 用途：按 id 查询或删除资源。
* `@RequestParam`：
  - 含义：读取 URL 查询参数，且可选。  
  - 用途：更新接口支持“只改 name 或只改 email ”。
* `@RequestBody`：
  - 含义：把请求体 JSON 自动反序列化为对象。  
  - 用途：创建学生时直接接收前端传来的 JSON。
* `@Autowired`:
  - 含义：依赖注入。  
  - 用途：控制器拿到 Service，Service 拿到 Repository，实现分层解耦。

### 3.3 业务层 Service

文件：

* `src/main/java/com/example/demo/service/StudentService.java`
* `src/main/java/com/example/demo/service/StudentServiceImpl.java`

作用：

* 编写业务逻辑
* 做参数校验和业务规则控制
* 调用 Repository 访问数据库
* 处理 DTO 和 Entity 转换

知识点：

* 接口与实现分离
* `@Service`
* `@Transactional`
* 业务异常抛出
* JPA 常用查询和保存

### 3.4 数据访问层 DAO / Repository

文件：

* `src/main/java/com/example/demo/dao/Student.java`
* `src/main/java/com/example/demo/dao/StudentRepository.java`

作用：

* `Student.java`：实体类，对应数据库表
* `StudentRepository.java`：数据库访问接口

知识点：

* `@Entity`：
  - 含义：声明该类是 JPA 实体。  
  - 用途：与数据库表建立 ORM 映射。
* `@Table`：
  - 含义：指定实体对应表名。  
  - 用途：明确映射到 student 表。
* `@Id`：
  -  含义：主键字段。  
  - 用途：JPA 识别唯一标识，用于增删改查定位记录。
* `@GeneratedValue`：
  - 含义：主键由数据库自增生成。  
  - 用途：插入时不手动赋 id，由 MySQL 负责生成。
* `@Column(name="...")`:
  - 含义：字段与列名映射。  
  - 用途：避免命名不一致导致映射错误。
* `JpaRepository<Student, Long>`:
  - 含义：继承 JPA 通用仓库。  
  - 用途：直接获得大量现成 CRUD 方法：findById、save、deleteById 等，无需手写 SQL。
* `findByEmail(String email)`
  - 含义：方法名派生查询（Query Method）。  
  - 用途：Spring Data 按命名规则自动生成 SQL，用于邮箱唯一性检查。

### 3.5 DTO 层

文件：`src/main/java/com/example/demo/dto/StudentDTO.java`

作用：

* 作为接口输入输出的数据对象
* 避免直接暴露数据库实体对象

知识点：

* DTO 和 Entity 分离
* 面向接口的数据设计

### 3.6 转换层 Converter

文件：`src/main/java/com/example/demo/converter/StudentConverter.java`

作用：

* 把 `Student` 转成 `StudentDTO`
* 把 `StudentDTO` 转成 `Student`

知识点：

* 对象转换
* 解耦接口模型和数据库模型

### 3.7 统一响应层

文件：`src/main/java/com/example/demo/Response.java`

作用：

* 统一封装接口返回值
* 包含成功标记、数据体、错误信息

知识点：

* 泛型类 `Response<T>`
* 静态工厂方法
* 统一返回结构

### 3.8 配置层

文件：`src/main/resources/application.properties`

作用：

* 配置应用名
* 配置 MySQL 数据源
* 配置驱动类

知识点：

* Spring Boot 配置约定
* JDBC URL
* 数据源自动装配

### 3.9 测试层

文件：`src/test/java/com/example/demo/DemoApplicationTests.java`

作用：

* 验证 Spring 上下文是否正常加载

知识点：

* `@SpringBootTest`
* JUnit 5
* 集成测试

## 4. 关键代码逐行注释

* * *

## 4.1 `pom.xml`

    <?xml version="1.0" encoding="UTF-8"?>
    <!-- XML 文件声明，表示使用 UTF-8 编码 -->
    
    <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
        <!-- Maven 项目根标签 -->
    
        <modelVersion>4.0.0</modelVersion>
        <!-- Maven POM 模型版本 -->
    
        <parent>
            <groupId>org.springframework.boot</groupId>
            <!-- Spring Boot 官方父工程组织 -->
    
            <artifactId>spring-boot-starter-parent</artifactId>
            <!-- Spring Boot 父工程 -->
    
            <version>4.0.5</version>
            <!-- Spring Boot 版本 -->
    
            <relativePath/>
            <!-- 从仓库中查找父工程 -->
        </parent>
    
        <groupId>com.example</groupId>
        <!-- 当前项目组织名 -->
    
        <artifactId>demo</artifactId>
        <!-- 当前项目名 -->
    
        <version>0.0.1-SNAPSHOT</version>
        <!-- 当前项目版本 -->
    
        <name/>
        <!-- 项目名称，当前为空 -->
    
        <description/>
        <!-- 项目描述，当前为空 -->
    
        <url/>
        <!-- 项目地址，当前为空 -->
    
        <licenses>
            <license/>
        </licenses>
        <!-- 许可证配置，当前为空 -->
    
        <developers>
            <developer/>
        </developers>
        <!-- 开发者配置，当前为空 -->
    
        <scm>
            <connection/>
            <developerConnection/>
            <tag/>
            <url/>
        </scm>
        <!-- 代码仓库信息，当前为空 -->
    
        <properties>
            <java.version>17</java.version>
            <!-- 指定 Java 17 -->
        </properties>
    
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-data-jpa</artifactId>
                <!-- JPA 依赖 -->
            </dependency>
    
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-webmvc</artifactId>
                <!-- Spring MVC 依赖 -->
            </dependency>
    
            <dependency>
                <groupId>com.mysql</groupId>
                <artifactId>mysql-connector-j</artifactId>
                <scope>runtime</scope>
                <!-- MySQL 驱动，运行时生效 -->
            </dependency>
    
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-data-jpa-test</artifactId>
                <scope>test</scope>
                <!-- JPA 测试依赖 -->
            </dependency>
    
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-webmvc-test</artifactId>
                <scope>test</scope>
                <!-- MVC 测试依赖 -->
            </dependency>
    
            <dependency>
                <groupId>com.mysql</groupId>
                <artifactId>mysql-connector-j</artifactId>
                <!-- 重复依赖，建议删除 -->
            </dependency>
        </dependencies>
    
        <build>
            <plugins>
                <plugin>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-maven-plugin</artifactId>
                    <!-- Spring Boot 打包插件 -->
    
                    <executions>
                        <execution>
                            <goals>
                                <goal>repackage</goal>
                                <!-- 重新打包成可执行 jar -->
                            </goals>
                        </execution>
                    </executions>
                </plugin>
    
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-surefire-plugin</artifactId>
                    <!-- 测试插件 -->
    
                    <configuration>
                        <skipTests>true</skipTests>
                        <!-- 跳过测试 -->
                    </configuration>
                </plugin>
            </plugins>
        </build>
    </project>

* * *

## 4.2 `DemoApplication.java`

    package com.example.demo;
    // 当前类所在包
    
    import org.springframework.boot.SpringApplication;
    // Spring Boot 启动工具类
    
    import org.springframework.boot.autoconfigure.SpringBootApplication;
    // Spring Boot 核心启动注解
    
    @SpringBootApplication
    // 表示这是 Spring Boot 启动类
    public class DemoApplication {
    
        public static void main(String[] args) {
            // Java 主方法，程序入口
    
            SpringApplication.run(DemoApplication.class, args);
            // 启动 Spring Boot 容器
        }
    }

* * *

## 4.3 `Response.java`

    package com.example.demo;
    // 包名
    
    public class Response<T> {
    // 定义泛型响应类
    
        private T data;
        // 成功时返回的数据
    
        private boolean success;
        // 是否成功
    
        private String errorMsg;
        // 错误信息
    
        public static <K> Response<K> newSuccess(K data) {
            // 创建成功响应
            Response<K> response = new Response<>();
            // 创建对象
            response.setData(data);
            // 设置数据
            response.setSuccess(true);
            // 设置成功标记
            return response;
            // 返回对象
        }
    
        public static Response<Void> newFail(String errorMsg) {
            // 创建失败响应
            Response<Void> response = new Response<>();
            // 创建对象
            response.setErrorMsg(errorMsg);
            // 设置错误信息
            response.setSuccess(false);
            // 设置失败标记
            return response;
            // 返回对象
        }
    
        public T getData() {
            return data;
        }
    
        public void setData(T data) {
            this.data = data;
        }
    
        public boolean isSuccess() {
            return success;
        }
    
        public void setSuccess(boolean success) {
            this.success = success;
        }
    
        public String getErrorMsg() {
            return errorMsg;
        }
    
        public void setErrorMsg(String errorMsg) {
            this.errorMsg = errorMsg;
        }
    }

* * *

## 4.4 `TestController.java`

    package com.example.demo;
    // 包名
    
    import org.springframework.web.bind.annotation.GetMapping;
    // GET 请求映射注解
    
    import org.springframework.web.bind.annotation.RestController;
    // REST 控制器注解
    
    @RestController
    // 当前类作为 REST 接口控制器
    public class TestController {
    
        @GetMapping("/hello")
        // 访问 GET /hello 时调用该方法
        public String hello() {
            return "hello,SpringBoot";
            // 返回固定字符串
        }
    }

* * *

## 4.5 `StudentController.java`

    package com.example.demo.Controller;
    // 控制层包
    
    import com.example.demo.Response;
    // 导入统一响应类
    
    import com.example.demo.dao.Student;
    // 导入 Student，但当前未使用
    
    import com.example.demo.dto.StudentDTO;
    // 导入 DTO
    
    import com.example.demo.service.StudentService;
    // 导入业务接口
    
    import org.springframework.beans.factory.annotation.Autowired;
    // 自动注入注解
    
    import org.springframework.web.bind.annotation.*;
    // 导入请求映射相关注解
    
    @RestController
    // REST 控制器
    public class StudentController {
    
        @Autowired
        private StudentService studentService;
        // 注入 StudentService
    
        @GetMapping("/student/{id}")
        // 查询学生接口
        public Response<StudentDTO> getStudentById(@PathVariable long id) {
            // 从路径中获取 id
            return Response.newSuccess(studentService.getStudentById(id));
            // 调用业务层并包装结果
        }
    
        @PostMapping("/student")
        // 新增学生接口
        public Response<Long> addNewStudent(@RequestBody StudentDTO studentDTO) {
            // 从请求体中接收 JSON
            return Response.newSuccess(studentService.addNewStudent(studentDTO));
            // 返回新增记录 id
        }
    
        @DeleteMapping("/student/{id}")
        // 删除学生接口
        public void deleteStudentById(@PathVariable long id) {
            // 当前方法为空，尚未实现
        }
    
        @PutMapping("/student/{id}")
        // 更新学生接口
        public Response<StudentDTO> updateStudentById(@PathVariable long id,
                                                      @RequestParam(required = false) String name,
                                                      @RequestParam(required = false) String email) {
            // 从请求参数接收 name 和 email
            return Response.newSuccess(studentService.updateStudentById(id, name, email));
            // 调用业务层返回更新结果
        }
    }

* * *

## 4.6 `StudentService.java`

    package com.example.demo.service;
    // 业务层包
    
    import com.example.demo.dao.Student;
    // 当前未使用，可删除
    
    import com.example.demo.dto.StudentDTO;
    // 导入 DTO
    
    public interface StudentService {
        // 学生业务接口
    
        StudentDTO getStudentById(long id);
        // 查询学生
    
        Long addNewStudent(StudentDTO studentDTO);
        // 新增学生
    
        void deleteStudentById(long id);
        // 删除学生
    
        StudentDTO updateStudentById(long id, String name, String email);
        // 更新学生
    }

* * *

## 4.7 `StudentServiceImpl.java`

    package com.example.demo.service;
    // 业务实现层包
    
    import com.example.demo.converter.StudentConverter;
    // 导入转换器
    
    import com.example.demo.dao.Student;
    // 导入实体类
    
    import com.example.demo.dao.StudentRepository;
    // 导入仓库接口
    
    import com.example.demo.dto.StudentDTO;
    // 导入 DTO
    
    import jakarta.transaction.Transactional;
    // 事务注解
    
    import org.springframework.beans.factory.annotation.Autowired;
    // 自动注入注解
    
    import org.springframework.stereotype.Service;
    // Service 注解
    
    import org.springframework.util.CollectionUtils;
    // 集合工具类
    
    import org.springframework.util.StringUtils;
    // 字符串工具类
    
    import java.util.List;
    // List 集合
    
    @Service
    // 声明为 Service Bean
    public class StudentServiceImpl implements StudentService {
    
        @Autowired
        private StudentRepository studentRepository;
        // 注入 Repository
    
        @Override
        public StudentDTO getStudentById(long id) {
            Student student = studentRepository.findById(id).orElseThrow(RuntimeException::new);
            // 根据 id 查询，不存在则抛异常
            return StudentConverter.convertStudent(student);
            // 实体转 DTO
        }
    
        @Override
        public Long addNewStudent(StudentDTO studentDTO) {
            List<Student> studentList = studentRepository.findbyEmail(studentDTO.getEmail());
            // 根据邮箱查询是否重复
    
            if (!CollectionUtils.isEmpty(studentList)) {
                throw new IllegalStateException("email: " + studentDTO.getEmail() + " already exists");
                // 如果邮箱已存在，则抛出异常
            }
    
            Student student = studentRepository.save(StudentConverter.convertStudent(studentDTO));
            // DTO 转实体并保存
    
            return student.getId();
            // 返回生成的主键 id
        }
    
        @Override
        public void deleteStudentById(long id) {
            studentRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("id: " + id + " does not exist"));
            // 删除前先检查是否存在
    
            studentRepository.deleteById(id);
            // 执行删除
        }
    
        @Override
        @Transactional
        public StudentDTO updateStudentById(long id, String name, String email) {
            Student studentInDB = studentRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("id: " + id + " does not exist"));
            // 先查出数据库中的学生
    
            if (StringUtils.hasLength(name) && studentInDB.getName().equals(name)) {
                studentInDB.setName(name);
                // 这里逻辑写反了，通常应为 !equals(name)
            }
    
            if (StringUtils.hasLength(email) && studentInDB.getEmail().equals(email)) {
                studentInDB.setEmail(email);
                // 这里逻辑也写反了，通常应为 !equals(email)
            }
    
            Student student = studentRepository.save(studentInDB);
            // 保存更新后的对象
    
            return StudentConverter.convertStudent(student);
            // 转换为 DTO 返回
        }
    }

* * *

## 4.8 `Student.java`

    package com.example.demo.dao;
    // 数据访问层包
    
    import jakarta.persistence.*;
    // JPA 注解
    
    import static jakarta.persistence.GenerationType.IDENTITY;
    // 主键自增策略
    
    @Entity
    // 声明为实体类
    @Table(name = "student")
    // 对应数据库 student 表
    public class Student {
    
        @Id
        // 主键
        @GeneratedValue(strategy = IDENTITY)
        // 自增主键
        @Column(name = "id")
        // 对应列 id
        private long id;
    
        @Column(name = "name")
        // 对应列 name
        private String name;
    
        @Column(name = "email")
        // 对应列 email
        private String email;
    
        @Column(name = "age")
        // 对应列 age
        private int age;
    
        public long getId() {
            return id;
        }
    
        public void setId(long id) {
            this.id = id;
        }
    
        public String getName() {
            return name;
        }
    
        public void setName(String name) {
            this.name = name;
        }
    
        public String getEmail() {
            return email;
        }
    
        public void setEmail(String email) {
            this.email = email;
        }
    
        public int getAge() {
            return age;
        }
    
        public void setAge(int age) {
            this.age = age;
        }
    }

* * *

## 4.9 `StudentRepository.java`

    package com.example.demo.dao;
    // 数据访问层包
    
    import org.springframework.data.jpa.repository.JpaRepository;
    // JPA 仓库父接口
    
    import org.springframework.stereotype.Repository;
    // Repository 注解
    
    import java.util.List;
    // List 类型
    
    @Repository
    // 标记为数据访问组件
    public interface StudentRepository extends JpaRepository<Student, Long> {
        // 继承后自动具备 CRUD 能力
    
        List<Student> findbyEmail(String email);
        // 按邮箱查询
        // 标准命名建议改为 findByEmail
    }

* * *

## 4.10 `StudentDTO.java`

    package com.example.demo.dto;
    // DTO 包
    
    public class StudentDTO {
        // 学生传输对象
    
        private long id;
        // 学生 id
    
        private String name;
        // 学生姓名
    
        private String email;
        // 学生邮箱
    
        public long getId() {
            return id;
        }
    
        public void setId(long id) {
            this.id = id;
        }
    
        public String getName() {
            return name;
        }
    
        public void setName(String name) {
            this.name = name;
        }
    
        public String getEmail() {
            return email;
        }
    
        public void setEmail(String email) {
            this.email = email;
        }
    }

* * *

## 4.11 `StudentConverter.java`

    package com.example.demo.converter;
    // 转换器包
    
    import com.example.demo.dao.Student;
    // 导入实体类
    
    import com.example.demo.dto.StudentDTO;
    // 导入 DTO 类
    
    public class StudentConverter {
        // 转换器类
    
        public static StudentDTO convertStudent(Student student) {
            // 实体转 DTO
            StudentDTO studentDTO = new StudentDTO();
            // 创建 DTO 对象
            studentDTO.setId(student.getId());
            // 复制 id
            studentDTO.setName(student.getName());
            // 复制 name
            studentDTO.setEmail(student.getEmail());
            // 复制 email
            return studentDTO;
            // 返回 DTO
        }
    
        public static Student convertStudent(StudentDTO studentDTO) {
            // DTO 转实体
            Student student = new Student();
            // 创建实体对象
            student.setId(studentDTO.getId());
            // 复制 id
            student.setName(studentDTO.getName());
            // 复制 name
            student.setEmail(studentDTO.getEmail());
            // 复制 email
            return student;
            // 返回实体对象
        }
    }

* * *

## 4.12 `application.properties`

    spring.application.name=demo
    # 应用名称
    
    spring.datasource.url=jdbc:mysql://localhost:3306/test?useSSL=false&serverTimezone=Asia/Shanghai&allowPublicKeyRetrieval=true&characterEncoding=utf-8
    # 数据库连接地址，数据库名是 test
    
    spring.datasource.username=root
    # 数据库用户名
    
    spring.datasource.password=Root@123456
    # 数据库密码
    
    spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
    # MySQL 驱动类

* * *

## 4.13 `DemoApplicationTests.java`

    package com.example.demo;
    // 测试包
    
    import org.junit.jupiter.api.Test;
    // JUnit 5 测试注解
    
    import org.springframework.boot.test.context.SpringBootTest;
    // Spring Boot 测试注解
    
    @SpringBootTest
    // 启动完整 Spring 上下文
    class DemoApplicationTests {
    
        @Test
        // 测试方法
        void contextLoads() {
            // 空测试，验证容器能否正常启动
        }
    }



