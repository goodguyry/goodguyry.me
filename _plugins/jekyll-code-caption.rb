module Jekyll
  module Tags
    class HighlightBlock < Liquid::Block
      include Liquid::StandardFilters

      def initialize(tag_name, markup, tokens)
        super
        if markup.strip != ''
          @lang = markup.strip.split(' ', 2)[0]
          @text = markup.strip.split(' ', 2)[1].to_s
          @caption = []
          if @text != ''
            # Split along 3 possible forms -- key="<quoted list>", key=value, or key
            @text.scan(/(?:\w="[^"]*"|\w=\w|\w)+/) do |opt|
              key, value = opt.split('=', 2)
              # If a quoted list, convert to array
              if value && value.include?("\"")
                value.delete!('"')
                  value = value.split
              end
              @caption = value || ""
            end
          end
        else
          raise SyntaxError.new <<-eos
Syntax Error in tag 'codeblock' while parsing the following markup:

  "#{markup}"

Valid syntax: codeblock <lang> caption="<caption>"
eos
        end
      end

      def render(context)
        prefix = context["highlighter_prefix"] || ""
        suffix = context["highlighter_suffix"] || ""
        code = super.to_s.gsub(/\A(\n|\r)+|(\n|\r)+\z/, '')

        is_safe = !!context.registers[:site].safe

        output =
          case context.registers[:site].highlighter
          when 'pygments'
            render_pygments(code, is_safe)
          when 'rouge'
            render_rouge(code)
          else
            render_codehighlighter(code)
          end

        rendered_output = add_code_tag(output)
        prefix + rendered_output + suffix
      end

      def render_rouge(code)
        Jekyll::External.require_with_graceful_fail('rouge')
        formatter = Rouge::Formatters::HTML.new(:line_numbers => false, :wrap => false)
        lexer = Rouge::Lexer.find_fancy(@lang, code) || Rouge::Lexers::PlainText
        formatter.format(lexer.lex(code))
      end

      def render_codehighlighter(code)
        h(code).strip
      end

      def add_code_tag(code)
        code_attributes = [
          "class=\"language-#{@lang.to_s.tr('+', '-')}\"",
          "data-lang=\"#{@lang}\""
        ].join(" ")
        "#{@mark}<figure class=\"highlight\"><pre><code #{code_attributes}>#{code.chomp}</code></pre><figcaption>#{@caption.join(' ')}</figcaption></figure>"
      end
    end
  end
end

Liquid::Template.register_tag('codeblock', Jekyll::Tags::HighlightBlock)
