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

  @override
  void initState() {
    super.initState();
    controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      // ..addJavaScriptChannel(
      //   'Flutter',
      //   onMessageReceived: (JavaScriptMessage message) {
      //     print(message.message);
      //   },
      // )
      ..addJavaScriptChannel(
        'Flutter',
        onMessageReceived: (JavaScriptMessage message) {
          final route = message.message;
          if (context.mounted) {
            context.go(route);
          }
        },
      )
      ..loadFlutterAsset('assets/web-content/index.html');
  }

  @override
  Widget build(BuildContext context) {
    super.build(context);
    return Column(
      children: [
        SafeArea(
          child: Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            color: Colors.white,
            child: TextField(
              decoration: InputDecoration(
                hintText: '搜索',
                prefixIcon: const Icon(Icons.search),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(24),
                  borderSide: BorderSide.none,
                ),
                filled: true,
                fillColor: Colors.grey[100],
                contentPadding: const EdgeInsets.symmetric(horizontal: 16),
              ),
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