import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:go_router/go_router.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> with AutomaticKeepAliveClientMixin {
  late final WebViewController controller;

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
              final double safeHeight = MediaQuery.of(context).padding.top;
              controller.runJavaScript('window.Flutter.setSafeHeight($safeHeight);');
            });
          }
        },
      )
      ..loadFlutterAsset('assets/web-content/index.html')
      ..setNavigationDelegate(
        NavigationDelegate(
          onPageFinished: (String url) {
            // 确保HTML文件加载完成后设置hash路由
            controller.runJavaScript('window.location.hash = "#/profile";');
            print('Page finished loading: $url');
          },
        ),
      );
  }

  @override
  Widget build(BuildContext context) {
    super.build(context);
    return WebViewWidget(controller: controller);
  }

  @override
  bool get wantKeepAlive => true;
} 