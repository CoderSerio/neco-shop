import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:go_router/go_router.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> with AutomaticKeepAliveClientMixin {
  late final WebViewController controller;
  final double searchBarHeight = 56.0; // 搜索框高度

  @override
  void initState() {
    super.initState();
    controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..addJavaScriptChannel(
        'Flutter',
        onMessageReceived: (JavaScriptMessage message) {
          final messageContent = message.message;
          if (messageContent.startsWith('navigate:')) {
            final route = messageContent.replaceFirst('navigate:', '');
            if (context.mounted) {
              context.go(route);
            }
          } else if (messageContent == 'getSafeHeight') {
            WidgetsBinding.instance.addPostFrameCallback((_) {
              // 加上搜索框的高度
              final double safeHeight = MediaQuery.of(context).padding.top;
              controller.runJavaScript('window.Flutter.setSafeHeight($safeHeight);');
            });
          }
        },
      )
      ..loadFlutterAsset('assets/web-content/index.html');
      // ..setNavigationDelegate(
      //   NavigationDelegate(
      //     onPageFinished: (String url) {
      //       // 确保HTML文件加载完成后设置hash路由
      //       controller.runJavaScript('window.location.hash = "#/profile";');
      //       print('Page finished loading: $url');
      //     },
      //   ),
      // );
  }

  @override
  Widget build(BuildContext context) {
    super.build(context);
    return Column(
      children: [
        SafeArea(
          child: Container(
            width: double.infinity,
            height: searchBarHeight,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            color: Colors.white,
            child: TextField(
              decoration: InputDecoration(
                hintText: '搜索',
                hintStyle: TextStyle(color: Colors.pink[200]),
                prefixIcon: Icon(Icons.search, color: Colors.pink[300]),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(24),
                  borderSide: BorderSide.none,
                ),
                filled: true,
                // fillColor: Colors.pink[50],
                contentPadding: const EdgeInsets.symmetric(horizontal: 16),
                focusedBorder: OutlineInputBorder(
                  // borderRadius: BorderRadius.circular(24),
                  // borderSide: BorderSide(color: Colors.pink[200]!, width: 1),
                ),
              ),
              // cursorColor: Colors.pink[300],
            ),
          ),
        ),
        Expanded(
          child: WebViewWidget(controller: controller),
        ),
      ],
    );
  }

  @override
  bool get wantKeepAlive => true;
}