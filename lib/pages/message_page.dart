import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class MessagePage extends StatefulWidget {
  const MessagePage({super.key});

  @override
  State<MessagePage> createState() => _MessagePageState();
}

class _MessagePageState extends State<MessagePage> with AutomaticKeepAliveClientMixin {
  late final WebViewController controller;

  @override
  void initState() {
    super.initState();
    controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..loadRequest(Uri.parse('https://github.com'));
  }

  @override
  Widget build(BuildContext context) {
    super.build(context);
    return WebViewWidget(controller: controller);
  }

  @override
  bool get wantKeepAlive => true;
} 