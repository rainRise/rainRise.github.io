---
title: CampusAsset Spring Boot 基础知识点
published: 2026-05-15
description: 'SpringBoot'
image: '/assets/desktop-banner/10.png'
tags: [自主学习]
category: '知识点'
draft: false 
lang: 'zh-CN'
---


# CampusAsset Spring Boot 后端框架学习日志

## 1. 学习目标

这篇日志用于复习 CampusAsset 项目中 Java 后端使用到的 Spring Boot 框架知识。

项目后端不是单独使用某一个 Spring Boot 功能，而是把 Spring Boot 的 Web 接口、配置管理、依赖注入、安全认证、数据库访问、事务、异常处理、SQL 初始化和测试能力组合起来，支撑一个校园资产管理系统。

复习时可以抓住一条主线：

    浏览器前端
      -> Axios 请求后端 REST API
      -> Spring Security + JWT 校验身份
      -> Controller 处理业务请求
      -> JdbcTemplate 访问数据库
      -> ApiResponse 统一返回给前端

## 2. 项目中的 Spring Boot 功能总览

本项目 Java 后端主要用到了这些 Spring Boot / Spring 生态能力：

1. 启动与自动配置：`@SpringBootApplication`
2. REST 接口开发：`@RestController`、`@RequestMapping`、`@GetMapping`、`@PostMapping`
3. 依赖注入：构造器注入、`@Bean`、`@Service`、`@Component`
4. 配置读取：`application.yml`、`@Value`
5. Spring Security：接口鉴权、过滤器链、自定义 JWT Filter
6. 跨域配置：CORS
7. 数据库访问：`JdbcTemplate`
8. 事务控制：`@Transactional`
9. 全局异常处理：`@RestControllerAdvice`、`@ExceptionHandler`
10. 参数校验：`@Validated`、`@NotBlank`
11. SQL 初始化：`spring.sql.init`
12. 接口测试：Spring Boot Test + MockMvc

## 3. Spring Boot 启动入口

实现位置：`CampusAssetApplication.java`

核心代码：

    @SpringBootApplication
    public class CampusAssetApplication {
    
        public static void main(String[] args) {
            SpringApplication.run(CampusAssetApplication.class, args);
        }
    }

知识点解释：

`@SpringBootApplication` 是 Spring Boot 项目的核心入口注解。它相当于组合了自动配置、组件扫描和配置声明。

启动后，Spring Boot 会扫描当前包 `com.campusasset` 及其子包下面的 Controller、Service、Configuration、Component 等类，并把它们交给 Spring 容器管理。

复习记忆：

    SpringApplication.run()
      -> 启动 Spring 容器
      -> 扫描组件
      -> 加载 application.yml
      -> 自动配置 Web、安全、数据库等能力

答辩讲法：

本项目后端通过 `@SpringBootApplication` 启动 Spring Boot 应用，框架会自动扫描并装配后端所需的 Web 接口、安全配置、数据库访问等组件。

## 4. REST 接口开发

实现位置：`AuthController.java`、`AssetController.java`、`AssetFlowController.java`、`AssetProcessController.java`

Spring Boot Web 最常见的用法就是写 REST API。项目中所有后端接口基本都通过 Controller 对外提供。

登录接口示例：

    @Validated
    @RestController
    @RequestMapping("/api/auth")
    public class AuthController {
        private final JwtService jwtService;
    
        public AuthController(JwtService jwtService) {
            this.jwtService = jwtService;
        }
    
        @PostMapping("/login")
        public ApiResponse<Map<String, String>> login(@RequestBody LoginRequest request) {
            if (!"admin".equals(request.username()) || !"admin123".equals(request.password())) {
                return new ApiResponse<>(401, "Invalid username or password", null);
            }
            return ApiResponse.success(Map.of("token", jwtService.createToken(request.username())));
        }
    }

资产接口示例：

    @RestController
    @RequestMapping("/api/assets")
    public class AssetController {
        private final JdbcTemplate jdbcTemplate;
    
        public AssetController(JdbcTemplate jdbcTemplate) {
            this.jdbcTemplate = jdbcTemplate;
        }
    
        @GetMapping
        public ApiResponse<List<Map<String, Object>>> list() {
            return ApiResponse.success(jdbcTemplate.query(ASSET_LIST_SQL, (rs, rowNum) -> mapAsset(rs)));
        }
    
        @PostMapping
        public ApiResponse<Map<String, String>> create(@RequestBody CreateAssetRequest request) {
            jdbcTemplate.update(ASSET_INSERT_SQL, insertArgs(request));
            return ApiResponse.success(Map.of("assetCode", request.assetCode()));
        }
    
        @PutMapping("/{assetCode}")
        public ApiResponse<Map<String, String>> update(
                @PathVariable String assetCode,
                @RequestBody CreateAssetRequest request) {
            jdbcTemplate.update(ASSET_UPDATE_SQL, updateArgs(assetCode, request));
            return ApiResponse.success(Map.of("assetCode", assetCode));
        }
    
        @DeleteMapping("/{assetCode}")
        public ApiResponse<Map<String, String>> delete(@PathVariable String assetCode) {
            jdbcTemplate.update(ASSET_DELETE_SQL, assetCode);
            return ApiResponse.success(Map.of("assetCode", assetCode));
        }
    }

注解说明：

`@RestController` 表示这是一个 REST 控制器，返回值会自动转成 JSON。

`@RequestMapping` 定义模块级路径，比如 `/api/assets`。

`@GetMapping` 用于查询。

`@PostMapping` 用于新增。

`@PutMapping` 用于修改。

`@DeleteMapping` 用于删除。

`@RequestBody` 接收前端 JSON 请求体。

`@PathVariable` 接收 URL 路径中的变量。

`@RequestParam` 接收查询参数。

复习记忆：

    前端请求 POST /api/assets
      -> AssetController.create()
      -> @RequestBody 把 JSON 转成 Java record
      -> JdbcTemplate 写入数据库
      -> ApiResponse 返回 JSON

## 5. 统一响应结构

实现位置：`ApiResponse.java`

核心代码：

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public class ApiResponse<T> {
        private Integer code;
        private String message;
        private T data;
    
        public static <T> ApiResponse<T> success(T data) {
            return new ApiResponse<>(200, "Success", data);
        }
    }

知识点解释：

这个类不是 Spring Boot 内置类，但它体现了后端接口设计中的统一返回规范。

所有接口都返回：

    {
      "code": 200,
      "message": "Success",
      "data": {}
    }

这样前端可以用统一方式判断接口是否成功，也方便展示错误信息。

复习记忆：

    Controller 不直接返回零散数据
    统一返回 ApiResponse<T>
    前端统一读取 response.data.code / message / data

## 6. 依赖注入

实现位置：多个 Controller、`JwtService.java`、`OperationLogFilter.java`

项目主要使用构造器注入。

示例一：Controller 注入 `JdbcTemplate`

    @RestController
    @RequestMapping("/api/assets")
    public class AssetController {
        private final JdbcTemplate jdbcTemplate;
    
        public AssetController(JdbcTemplate jdbcTemplate) {
            this.jdbcTemplate = jdbcTemplate;
        }
    }

示例二：Controller 注入自定义服务

    @RestController
    @RequestMapping("/api/auth")
    public class AuthController {
        private final JwtService jwtService;
    
        public AuthController(JwtService jwtService) {
            this.jwtService = jwtService;
        }
    }

示例三：JWT 服务交给 Spring 管理

    @Service
    public class JwtService {
        // token 创建和解析逻辑
    }

知识点解释：

依赖注入的意思是：对象不自己 new 依赖对象，而是由 Spring 容器创建好之后注入进来。

好处：

1. 代码更解耦。
2. 更容易测试。
3. 依赖生命周期由 Spring 统一管理。
4. 不需要在业务代码里手动创建工具对象。

复习记忆：

    Spring 容器负责创建对象
    Controller 只声明自己需要什么
    Spring 自动把 JdbcTemplate / JwtService 注入进来

## 7. 配置文件与配置读取

实现位置：`application.yml`、`JwtService.java`

配置示例：

    server:
      port: 8099
    
    spring:
      application:
        name: campusasset-backend
      datasource:
        url: ${CAMPUS_ASSET_DB_URL:jdbc:h2:mem:campus_asset;MODE=MySQL;DATABASE_TO_LOWER=TRUE;DB_CLOSE_DELAY=-1}
        username: ${CAMPUS_ASSET_DB_USERNAME:sa}
        password: ${CAMPUS_ASSET_DB_PASSWORD:}
    
    jwt:
      secret: ${CAMPUS_ASSET_JWT_SECRET:campus-asset-dev-secret-change-me}
      expire-seconds: 7200

Java 读取配置：

    public JwtService(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.expire-seconds}") long expireSeconds) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expireSeconds = expireSeconds;
    }

知识点解释：

Spring Boot 支持外部化配置。项目中的端口、数据库地址、数据库账号、JWT 密钥、token 过期时间都可以放在 `application.yml` 中。

配置里的 `${ENV:default}` 表示：

    优先读取环境变量 ENV
    如果没有环境变量，就使用 default 默认值

复习记忆：

    application.yml 管配置
    @Value 读配置
    环境变量覆盖默认值
    敏感信息不要写死在源码中

## 8. Spring Security 安全配置

实现位置：`SecurityConfig.java`

核心代码：

    @Configuration
    public class SecurityConfig {
        private static final String BEARER_PREFIX = "Bearer ";
    
        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtService jwtService) throws Exception {
            http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                    .requestMatchers("/api/health").permitAll()
                    .requestMatchers("/api/auth/login").permitAll()
                    .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter(jwtService), BasicAuthenticationFilter.class);
    
            return http.build();
        }
    }

知识点解释：

这段代码定义了后端接口的安全规则。

规则如下：

1. 开启 CORS，允许前端跨域访问。
2. 关闭 CSRF，因为这是前后端分离接口，不使用传统 Session 表单提交。
3. 放行 `/api/health`，用于健康检查。
4. 放行 `/api/auth/login`，用于登录获取 token。
5. 其他所有接口都必须认证。
6. 把自定义 JWT Filter 加入 Spring Security 过滤器链。

复习记忆：

    SecurityFilterChain 定义安全规则
    permitAll 放行公共接口
    authenticated 保护业务接口
    addFilterBefore 加入 JWT 校验过滤器

## 9. JWT Filter 登录态识别

实现位置：`SecurityConfig.java`

核心代码：

    private OncePerRequestFilter jwtFilter(JwtService jwtService) {
        return new OncePerRequestFilter() {
            @Override
            protected void doFilterInternal(
                    HttpServletRequest request,
                    HttpServletResponse response,
                    FilterChain chain) throws ServletException, IOException {
                String authorization = request.getHeader("Authorization");
                if (authorization == null || !authorization.startsWith(BEARER_PREFIX)) {
                    chain.doFilter(request, response);
                    return;
                }
    
                try {
                    Claims claims = jwtService.parse(authorization.substring(BEARER_PREFIX.length()));
                    List<SimpleGrantedAuthority> authorities =
                            List.of(new SimpleGrantedAuthority("ROLE_ADMIN"));
    
                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                            claims.getSubject(), null, authorities);
    
                    auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(auth);
                    chain.doFilter(request, response);
                } catch (RuntimeException exception) {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid bearer token");
                }
            }
        };
    }

知识点解释：

`OncePerRequestFilter` 表示一次请求只执行一次的过滤器。

JWT Filter 做了这些事：

1. 从请求头读取 `Authorization`。
2. 判断是否以 `Bearer ` 开头。
3. 去掉 `Bearer ` 前缀，拿到真正 token。
4. 调用 `jwtService.parse()` 校验 token。
5. 从 token 中取出用户名。
6. 构造 `UsernamePasswordAuthenticationToken`。
7. 写入 `SecurityContextHolder`。
8. 请求继续进入 Controller。

复习记忆：

    Authorization: Bearer xxx
      -> JWT Filter
      -> JwtService.parse(xxx)
      -> 得到用户名
      -> 写入 SecurityContext
      -> Spring Security 认为当前请求已认证

答辩讲法：

JWT Filter 是后端识别登录态的关键。前端每次请求带 token，后端过滤器解析 token 后，把用户信息放入 Spring Security 上下文，从而保护业务接口。

## 10. JWT 生成与解析

实现位置：`JwtService.java`

核心代码：

    @Service
    public class JwtService {
        private final SecretKey secretKey;
        private final long expireSeconds;
    
        public JwtService(
                @Value("${jwt.secret}") String secret,
                @Value("${jwt.expire-seconds}") long expireSeconds) {
            this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
            this.expireSeconds = expireSeconds;
        }
    
        public String createToken(String username) {
            Instant now = Instant.now();
            return Jwts.builder()
                    .subject(username)
                    .claim("roles", List.of("ADMIN"))
                    .claim("permissions", List.of("asset:view"))
                    .issuedAt(Date.from(now))
                    .expiration(Date.from(now.plusSeconds(expireSeconds)))
                    .signWith(secretKey)
                    .compact();
        }
    
        public Claims parse(String token) {
            return Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        }
    }

知识点解释：

JWT 本质上是一个经过签名的字符串，里面可以保存用户身份和过期时间。

`createToken()` 负责生成 token。

`parse()` 负责校验 token 并解析出 Claims。

本项目 token 中包含：

1. `subject`：用户名。
2. `roles`：角色，这里是 `ADMIN`。
3. `permissions`：权限，这里是 `asset:view`。
4. `issuedAt`：签发时间。
5. `expiration`：过期时间。
6. `signWith`：签名密钥。

复习记忆：

    登录成功
      -> createToken(username)
      -> 生成 JWT
      -> 前端保存 token
    
    请求接口
      -> parse(token)
      -> 校验签名和过期时间
      -> 得到用户名和权限信息

## 11. CORS 跨域配置

实现位置：`SecurityConfig.java`

核心代码：

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(
                "http://localhost:5173",
                "http://127.0.0.1:5173"
        ));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
    
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        return source;
    }

知识点解释：

前端运行在 `http://localhost:5173`，后端运行在 `http://localhost:8099`。协议、域名、端口只要有一个不同，浏览器就认为是跨域。

所以后端必须允许前端地址访问接口，并允许携带 `Authorization` 请求头，否则 JWT 无法传给后端。

复习记忆：

    前端端口 5173
    后端端口 8099
    浏览器发现跨域
    后端配置 CORS 放行

## 12. JdbcTemplate 数据库访问

实现位置：`AssetController.java`、`AssetSupportController.java`、`AssetFlowController.java`、`AssetProcessController.java`

查询资产列表：

    private static final String ASSET_LIST_SQL = """
            SELECT id, asset_code, asset_name, category_id, model, brand,
                   asset_value, quantity, location, responsible_person,
                   department, status
            FROM asset
            ORDER BY id ASC
            """;
    
    @GetMapping
    public ApiResponse<List<Map<String, Object>>> list() {
        return ApiResponse.success(jdbcTemplate.query(ASSET_LIST_SQL, (rs, rowNum) -> mapAsset(rs)));
    }

新增资产：

    private static final String ASSET_INSERT_SQL = """
            INSERT INTO asset (
              asset_code, asset_name, category_id, model, brand, asset_value,
              quantity, location, responsible_person, department, status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """;
    
    @PostMapping
    public ApiResponse<Map<String, String>> create(@RequestBody CreateAssetRequest request) {
        jdbcTemplate.update(ASSET_INSERT_SQL, insertArgs(request));
        return ApiResponse.success(Map.of("assetCode", request.assetCode()));
    }

结果映射：

    private Map<String, Object> mapAsset(java.sql.ResultSet rs) throws java.sql.SQLException {
        return Map.ofEntries(
                Map.entry("id", rs.getLong("id")),
                Map.entry("assetCode", rs.getString("asset_code")),
                Map.entry("assetName", rs.getString("asset_name")),
                Map.entry("categoryId", rs.getLong("category_id")),
                Map.entry("model", rs.getString("model")),
                Map.entry("brand", rs.getString("brand")),
                Map.entry("assetValue", rs.getBigDecimal("asset_value")),
                Map.entry("quantity", rs.getInt("quantity")),
                Map.entry("location", rs.getString("location")),
                Map.entry("responsiblePerson", rs.getString("responsible_person")),
                Map.entry("department", rs.getString("department")),
                Map.entry("status", rs.getString("status"))
        );
    }

知识点解释：

`JdbcTemplate` 是 Spring 提供的数据库访问工具。它比原生 JDBC 简洁，因为连接获取、语句执行、资源释放等工作由 Spring 帮你处理。

常见方法：

1. `query()`：查询多行数据。
2. `queryForObject()`：查询单个结果。
3. `update()`：执行新增、修改、删除。

复习记忆：

    JdbcTemplate.query() 查询列表
    JdbcTemplate.queryForObject() 查询单个值
    JdbcTemplate.update() 新增 / 修改 / 删除

## 13. 参数化 SQL 与查询条件拼接

实现位置：`AssetController.java`

搜索接口：

    @GetMapping("/search")
    public ApiResponse<Map<String, Object>> search(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "10") Integer pageSize) {
        SearchQuery query = buildSearchQuery(keyword, status, categoryId);
        int safePage = safeNumber(page, DEFAULT_PAGE);
        int safePageSize = safeNumber(pageSize, DEFAULT_PAGE_SIZE);
        long total = queryTotal(query);
        List<Map<String, Object>> records = queryRecords(query, safePage, safePageSize);
    
        return ApiResponse.success(Map.of(
                "records", records,
                "total", total,
                "page", safePage,
                "pageSize", safePageSize
        ));
    }

动态条件：

    private SearchQuery buildSearchQuery(String keyword, String status, Long categoryId) {
        StringBuilder where = new StringBuilder(" WHERE 1 = 1");
        List<Object> args = new ArrayList<>();
        appendKeywordFilter(where, args, keyword);
        appendStatusFilter(where, args, status);
        appendCategoryFilter(where, args, categoryId);
        return new SearchQuery(where.toString(), args);
    }
    
    private void appendKeywordFilter(StringBuilder where, List<Object> args, String keyword) {
        if (!hasText(keyword)) {
            return;
        }
        String value = "%" + keyword.trim() + "%";
        where.append(" AND (asset_code LIKE ? OR asset_name LIKE ?)");
        args.add(value);
        args.add(value);
    }

分页查询：

    private List<Map<String, Object>> queryRecords(SearchQuery query, int page, int pageSize) {
        List<Object> args = new ArrayList<>(query.args());
        args.add(pageSize);
        args.add((page - MIN_PAGE_VALUE) * pageSize);
        return jdbcTemplate.query("""
                SELECT id, asset_code, asset_name, category_id, model, brand,
                       asset_value, quantity, location, responsible_person,
                       department, status
                FROM asset
                """ + query.whereClause() + " ORDER BY id ASC LIMIT ? OFFSET ?",
                (rs, rowNum) -> mapAsset(rs), args.toArray());
    }

知识点解释：

这里最重要的是 SQL 中使用 `?` 占位符，而不是把用户输入直接拼进 SQL。

这样做的好处是降低 SQL 注入风险，也让参数绑定更清晰。

复习记忆：

    SQL 语句放 ?
    参数放 args
    JdbcTemplate 负责绑定参数
    不要直接拼接用户输入

## 14. 事务控制

实现位置：`AssetFlowController.java`、`AssetProcessController.java`

领用资产：

    @PostMapping("/api/borrows")
    @Transactional
    public ApiResponse<BorrowResult> createBorrow(@RequestBody BorrowRequest request) {
        String borrowNo = numberWithPrefix("BR");
        jdbcTemplate.update("""
                INSERT INTO asset_borrow (borrow_no, asset_code, borrower, purpose, status)
                VALUES (?, ?, ?, ?, ?)
                """, borrowNo, request.assetCode(), request.borrower(), request.purpose(), STATUS_BORROWED);
        updateAssetStatus(request.assetCode(), STATUS_BORROWED);
    
        Long id = jdbcTemplate.queryForObject(
                "SELECT id FROM asset_borrow WHERE borrow_no = ?", Long.class, borrowNo);
        return ApiResponse.success(new BorrowResult(id, borrowNo, request.assetCode(), STATUS_BORROWED));
    }

归还资产：

    @PutMapping("/api/borrows/{id}/return")
    @Transactional
    public ApiResponse<BorrowResult> returnBorrow(@PathVariable Long id) {
        BorrowRecord record = findBorrow(id);
        jdbcTemplate.update("""
                UPDATE asset_borrow
                SET status = ?, return_time = CURRENT_TIMESTAMP
                WHERE id = ?
                """, BORROW_RETURNED, id);
        updateAssetStatus(record.assetCode(), STATUS_IN_STOCK);
        return ApiResponse.success(new BorrowResult(id, record.borrowNo(), record.assetCode(), BORROW_RETURNED));
    }

知识点解释：

事务用于保证多条数据库操作的一致性。

比如领用资产时，系统要做两件事：

1. 插入一条领用记录。
2. 更新资产主表状态为 `BORROWED`。

如果第一步成功，第二步失败，就会出现“有领用记录，但资产状态没变”的问题。

加上 `@Transactional` 后，如果中途出现异常，整个方法中的数据库操作会一起回滚。

复习记忆：

    一个业务动作涉及多次数据库修改
    就要考虑事务
    
    @Transactional
      -> 全部成功才提交
      -> 中途失败就回滚

## 15. 资产生命周期状态流转

实现位置：`AssetFlowController.java`、`AssetProcessController.java`

状态常量：

    private static final String STATUS_BORROWED = "BORROWED";
    private static final String STATUS_IN_STOCK = "IN_STOCK";
    private static final String ASSET_UNDER_REPAIR = "UNDER_REPAIR";
    private static final String ASSET_SCRAPPED = "SCRAPPED";

更新资产状态：

    private void updateAssetStatus(String assetCode, String status) {
        jdbcTemplate.update("UPDATE asset SET status = ? WHERE asset_code = ?", status, assetCode);
    }

报修流程：

    @PostMapping("/api/repairs")
    @Transactional
    public ApiResponse<ProcessResult> createRepair(@RequestBody RepairRequest request) {
        String repairNo = numberWithPrefix("RP");
        jdbcTemplate.update("""
                INSERT INTO asset_repair (repair_no, asset_code, reporter, fault_description, status)
                VALUES (?, ?, ?, ?, ?)
                """, repairNo, request.assetCode(), request.reporter(),
                request.faultDescription(), REPAIR_PROCESSING);
        updateAssetStatus(request.assetCode(), ASSET_UNDER_REPAIR);
        return ApiResponse.success(new ProcessResult(findId("asset_repair", "repair_no", repairNo),
                repairNo, request.assetCode(), REPAIR_PROCESSING));
    }

维修完结：

    @PutMapping("/api/repairs/{id}/finish")
    @Transactional
    public ApiResponse<ProcessResult> finishRepair(@PathVariable Long id) {
        RepairRecord record = findRepair(id);
        jdbcTemplate.update("UPDATE asset_repair SET status = ?, finished_at = CURRENT_TIMESTAMP WHERE id = ?",
                REPAIR_DONE, id);
        updateAssetStatus(record.assetCode(), ASSET_IN_STOCK);
        return ApiResponse.success(new ProcessResult(id, record.repairNo(), record.assetCode(), REPAIR_DONE));
    }

知识点解释：

资产主表 `asset` 保存资产当前状态，流程表保存资产历史过程。

这样设计的好处是：

1. 看资产主表，可以快速知道资产当前在哪里、能不能用。
2. 看流程表，可以追踪资产经历过哪些操作。

复习记忆：

    asset 表 = 当前状态
    流程表 = 历史记录
    
    领用 -> BORROWED
    归还 -> IN_STOCK
    报修 -> UNDER_REPAIR
    维修完成 -> IN_STOCK
    报废审批 -> SCRAPPED

## 16. 全局异常处理

实现位置：`GlobalExceptionHandler.java`

核心代码：

    @RestControllerAdvice
    public class GlobalExceptionHandler {
    
        @ExceptionHandler(DuplicateKeyException.class)
        @ResponseStatus(HttpStatus.BAD_REQUEST)
        public ApiResponse<Void> handleDuplicateKey() {
            return new ApiResponse<>(400, "资产编号已存在", null);
        }
    }

知识点解释：

`@RestControllerAdvice` 是全局异常处理入口。

当 Controller 中发生指定异常时，可以统一捕获并返回固定格式的 JSON。

这里捕获的是 `DuplicateKeyException`，通常来自数据库唯一键冲突。例如资产编号 `asset_code` 已存在。

没有全局异常处理时，前端可能看到 500 错误和数据库异常细节。

有全局异常处理后，前端能看到清晰的业务提示：`资产编号已存在`。

复习记忆：

    数据库唯一键冲突
      -> DuplicateKeyException
      -> GlobalExceptionHandler 捕获
      -> 返回 400 + 资产编号已存在

## 17. 参数校验

实现位置：`AuthController.java`

核心代码：

    @Validated
    @RestController
    @RequestMapping("/api/auth")
    public class AuthController {
    
        public record LoginRequest(@NotBlank String username, @NotBlank String password) {
        }
    }

知识点解释：

Spring Boot 可以结合 Bean Validation 做参数校验。

`@NotBlank` 表示字符串不能为空，也不能全是空格。

`@Validated` 表示启用校验能力。

当前项目后端登录请求用了校验，但资产模块的后端校验还比较少，更多校验放在前端表单中。

复习记忆：

    @NotBlank 校验字段不能为空
    @Validated 启用方法参数校验
    后续可继续给资产 DTO 增加 @NotNull / @Min / @DecimalMin

## 18. 操作日志过滤器

实现位置：`OperationLogFilter.java`

核心代码：

    @Component
    public class OperationLogFilter extends OncePerRequestFilter {
        private static final String ANONYMOUS_USER = "anonymous";
        private static final String API_PREFIX = "/api/";
        private static final Set<String> MUTATING_METHODS = Set.of("POST", "PUT", "DELETE");
    
        @Override
        protected void doFilterInternal(
                HttpServletRequest request,
                HttpServletResponse response,
                FilterChain filterChain) throws ServletException, IOException {
            String username = currentUsername();
            filterChain.doFilter(request, response);
            if (shouldRecord(request)) {
                recordLog(username, request, response);
            }
        }
    
        private boolean shouldRecord(HttpServletRequest request) {
            return request.getRequestURI().startsWith(API_PREFIX)
                    && MUTATING_METHODS.contains(request.getMethod());
        }
    
        private void recordLog(
                String username,
                HttpServletRequest request,
                HttpServletResponse response) {
            jdbcTemplate.update(INSERT_SQL, username, request.getMethod(),
                    request.getRequestURI(), response.getStatus());
        }
    }

知识点解释：

这是 Spring Web Filter 的典型应用。

它不是某个业务接口，而是在请求进入和响应返回之间统一执行。

项目中它用来记录写操作日志：

1. 新增：`POST`
2. 修改：`PUT`
3. 删除：`DELETE`

记录内容包括：

1. 当前用户名。
2. 请求方法。
3. 请求路径。
4. 响应状态码。
5. 创建时间。

复习记忆：

    Filter 适合做通用横切逻辑
    比如：认证、日志、审计、请求耗时统计
    
    Controller 负责业务
    Filter 负责通用拦截

## 19. 操作日志查询接口

实现位置：`OperationLogController.java`

核心代码：

    @RestController
    public class OperationLogController {
        private static final String LIST_SQL = """
                SELECT id, username, request_method, request_path, status_code, created_at
                FROM operation_log
                ORDER BY id DESC
                LIMIT 20
                """;
    
        @GetMapping("/api/operation-logs")
        public ApiResponse<List<OperationLogItem>> list() {
            return ApiResponse.success(jdbcTemplate.query(LIST_SQL, this::mapItem));
        }
    }

业务动作名映射：

    private String actionName(String method, String path) {
        if (POST.equals(method) && "/api/assets".equals(path)) {
            return "新增资产";
        }
        if (PUT.equals(method) && path.startsWith("/api/assets/")) {
            return "编辑资产";
        }
        if (DELETE.equals(method) && path.startsWith("/api/assets/")) {
            return "删除资产";
        }
        if (POST.equals(method) && "/api/inbounds".equals(path)) {
            return "资产入库";
        }
        return method + " " + path;
    }

知识点解释：

日志表里保存的是技术路径，比如 `POST /api/assets`。但是前端展示时，普通管理员更希望看到业务动作，比如“新增资产”。

所以后端查询日志时做了一层转换，把请求方法和路径映射成业务名称。

复习记忆：

    日志记录技术信息
    日志展示转成业务语言
    技术路径方便排查
    业务动作方便用户理解

## 20. SQL 初始化

实现位置：`application.yml`、`init.sql`

配置代码：

    spring:
      sql:
        init:
          mode: ${CAMPUS_ASSET_SQL_INIT_MODE:always}
          encoding: UTF-8
          schema-locations: classpath:sql/init.sql

资产表 SQL：

    CREATE TABLE IF NOT EXISTS asset (
      id BIGINT PRIMARY KEY AUTO_INCREMENT,
      asset_code VARCHAR(64) NOT NULL UNIQUE,
      asset_name VARCHAR(128) NOT NULL,
      category_id BIGINT NOT NULL,
      model VARCHAR(128),
      brand VARCHAR(128),
      asset_value DECIMAL(12,2) DEFAULT 0,
      quantity INT DEFAULT 1,
      location VARCHAR(128),
      responsible_person VARCHAR(64),
      department VARCHAR(64),
      status VARCHAR(32) NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

初始化数据：

    INSERT INTO asset (
      asset_code, asset_name, category_id, model, brand, asset_value,
      quantity, location, responsible_person, department, status
    ) VALUES (
      'ASSET-2026-0001', '教学投影仪', 1, 'XG-500', 'Epson', 6800.00,
      1, '第一教学楼 A101', '张老师', '教务处', 'IN_STOCK'
    );

知识点解释：

Spring Boot 可以在启动时自动执行 SQL 文件。

这对课程设计和答辩演示很有用，因为启动项目后数据库表和演示数据会自动准备好。

复习记忆：

    init.sql 建表 + 插入演示数据
    application.yml 指定 SQL 初始化路径
    启动项目时自动执行

## 21. 测试支持

实现位置：`backend/src/test/java`

典型代码结构：

    @SpringBootTest
    @AutoConfigureMockMvc
    @ActiveProfiles("test")
    class AssetControllerTest {
    
        @Autowired
        private MockMvc mockMvc;
    
        @Test
        void shouldListAssets() throws Exception {
            mockMvc.perform(get("/api/assets")
                    .header("Authorization", "Bearer " + token))
                    .andExpect(status().isOk());
        }
    }

知识点解释：

`@SpringBootTest` 会启动 Spring Boot 测试上下文。

`@AutoConfigureMockMvc` 会自动配置 MockMvc。

`MockMvc` 可以模拟 HTTP 请求，不需要真的打开浏览器。

`@ActiveProfiles("test")` 表示测试时使用测试环境配置，比如 H2 内存数据库。

复习记忆：

    MockMvc 模拟 HTTP 请求
    不用启动前端
    不用打开浏览器
    直接测试后端接口行为

## 22. 项目里的 Spring Boot 后端运行链路

完整请求链路如下：

    用户点击前端按钮
      -> Vue 调用 Axios
      -> 请求发到 Spring Boot 后端
      -> CORS 放行跨域请求
      -> Spring Security 进入过滤器链
      -> JWT Filter 解析 Authorization token
      -> 认证通过后进入 Controller
      -> Controller 调用 JdbcTemplate 执行 SQL
      -> 数据库返回结果
      -> Controller 封装 ApiResponse
      -> 返回 JSON 给前端
      -> 前端刷新页面数据

你可以把 Spring Boot 在本项目里的作用理解为：

    Spring Boot 负责把后端常用能力整合起来
    Spring MVC 负责接口
    Spring Security 负责安全
    Spring JDBC 负责数据库
    Spring Transaction 负责事务
    Spring Validation 负责参数校验
    Spring Test 负责接口测试

## 23. 当前实现的简化点

为了答辩时说得准确，需要知道当前项目不是完整企业级后端，而是演示闭环版本。

当前简化点：

1. 登录账号是固定的 `admin / admin123`，没有真正查询用户表。
2. JWT 中角色和权限是写死的 `ADMIN` 和 `asset:view`。
3. RBAC 权限模型只体现在设计和 token 字段里，未实现完整用户角色菜单后台。
4. 后端引入了 MyBatis-Plus 依赖，但实际业务代码主要使用 `JdbcTemplate`。
5. `service`、`mapper`、`entity`、`dto`、`vo` 目录基本是预留结构。
6. 当前删除资产是物理删除，不是逻辑删除。
7. 参数校验还不完整，资产模块更多依赖前端表单校验。
8. 没有复杂审批流、文件上传、导入导出、消息通知。

答辩时可以这样说：

    当前项目重点是完成校园资产管理的最小可用闭环。
    后续如果继续完善，会把 Controller 中的业务逻辑拆分到 Service 层，使用 Entity、Mapper、DTO、VO 做标准分层，并补齐完整 RBAC、逻辑删除、导入导出和复杂审批流。

## 24. Spring Boot 复习路线

基于这个项目，复习 Spring Boot 可以按下面顺序：

第一阶段：理解启动和接口。

重点看：

    CampusAssetApplication.java
    AuthController.java
    AssetController.java
    ApiResponse.java

掌握：

    @SpringBootApplication
    @RestController
    @RequestMapping
    @GetMapping / @PostMapping / @PutMapping / @DeleteMapping
    @RequestBody / @PathVariable / @RequestParam

第二阶段：理解配置和依赖注入。

重点看：

    application.yml
    JwtService.java
    各 Controller 构造方法

掌握：

    application.yml
    @Value
    @Service
    @Component
    @Bean
    构造器注入

第三阶段：理解安全认证。

重点看：

    SecurityConfig.java
    JwtService.java
    AuthController.java

掌握：

    Spring Security
    SecurityFilterChain
    OncePerRequestFilter
    JWT
    SecurityContextHolder
    Authorization: Bearer token

第四阶段：理解数据库和事务。

重点看：

    AssetController.java
    AssetFlowController.java
    AssetProcessController.java
    init.sql

掌握：

    JdbcTemplate
    query / queryForObject / update
    参数化 SQL
    @Transactional

第五阶段：理解工程增强。

重点看：

    GlobalExceptionHandler.java
    OperationLogFilter.java
    OperationLogController.java
    测试类

掌握：

    @RestControllerAdvice
    @ExceptionHandler
    Filter
    MockMvc
    @SpringBootTest

## 25. 一句话总结

CampusAsset 后端用 Spring Boot 搭建了一个可运行的资产管理 REST 服务。它通过 Spring MVC 提供接口，通过 Spring Security + JWT 保护接口，通过 JdbcTemplate 访问数据库，通过事务保证资产状态流转一致，通过全局异常处理和操作日志提升系统可用性与可追踪性。

这正好覆盖了 Spring Boot Web 项目最常见的一套后端开发知识点，适合用来复习 Java 后端框架的基础能力。